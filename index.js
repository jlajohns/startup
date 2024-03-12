let activeTasks = [];
let taskHistory = [];
// set up express for the app
const express = require('express');
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


function updateTasks(newTask, tasks) {
    tasks.push(newTask);
    return tasks;
}

function addToActiveTasks(newTask, activeTasks) {
    activeTasks.push(newTask);
}

function deleteFromActiveTasks(taskID, activeTasks) {
    activeTasks = activeTasks.filter(task => task.id !== taskID)
}

function getTaskHistory(start, stop, taskHistory) {
    return taskHistory.slice(start, stop);
}

function addToTaskHistory(task, taskHistory) {
    taskHistory.push(task);
}
