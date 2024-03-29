const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

var activeTasks = [];
var taskHistory = [];
// set up express for the app
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

// Serve up the front-end static content housing
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// ACTIVE TASKS
// Add a new task
apiRouter.post('/activetasks', (req, res) => {
    addToActiveTasks(req.body, activeTasks);
    res.status(200).send();
});

// delete a task
apiRouter.delete('/activetasks', (req, res) => {
    deleteFromActiveTasks(req.body.id, activeTasks);
    res.send();
});
// get a list of active tasks
apiRouter.get('/activetasks', (req, res) => {
    res.send(activeTasks);
});
// TASK HISTORY
// get a list of task history
apiRouter.post('/taskhistoryquery', (req, res) => {
    subsetTasks = getTaskHistory(req.body[0], req.body[1], taskHistory);
    res.send(subsetTasks);
});
// add an item to task history
apiRouter.post('/taskhistory', (req, res) => {
    addToTaskHistory(req.body, taskHistory);
    res.send();
});


// Return application default page if path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});


function updateTasks(newTask, tasks) {
    tasks.push(newTask);
    return tasks;
}

function addToActiveTasks(newTask) {
    activeTasks.push(newTask);
}

function deleteFromActiveTasks(taskID) {
    activeTasks = activeTasks.filter(task => task.id !== taskID)
}

function getTaskHistory(start, stop) {
    return taskHistory.slice(start, stop);
}

function addToTaskHistory(task) {
    taskHistory.push(task);
}



// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth token if stored in cookie
  apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
  // GetUser returns information about a user
  apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
      const token = req?.cookies.token;
      res.send({ email: user.email, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
  });
  
  // secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
  const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
  peerProxy(httpService);
  