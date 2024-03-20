function login() {
    let tasks = [];
    console.log(tasks);
    //let tasks = [{task: "Take Midterm", project: "CS260", name: "Ethan", date: "02/04/2024"} , {task: "Add API to startup", project: "CS260", name: "Jascinda", date: "03/23/2024"} ,{task: "Read chapter 25", project: "Neurobiology", name: "Jascinda", date: "03/01/2024"}];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    let CS260exampleTasks = ["Add Javascript Interactives", "Study promises", "Take midterm", "update Readme page", "Add css header on index page"];
    localStorage.setItem('CS260exampleTasks', JSON.stringify(CS260exampleTasks));
    let NeuroexampleTasks = ["read chapter rubric", "Quiz for case study 3", "Update Quizlet notes", "choose presentation partner", "read chapter 15"];
    localStorage.setItem('NeuroexampleTasks', JSON.stringify(NeuroexampleTasks));
    window.location.href = "homepage.html";
}

// somehow get this combined with the login 
function taskHistoryLogin() {
    localStorage.clear();
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    let tasks = [];
    for (var i = 0; i < 30; i++) {
        var newTask = {
            task: "ExampleTask" + i,
            project: "ExampleProject",
            name: "ExampleUser",
            date: "2/29/24"
        }
        tasks.push(newTask);
    }

}

const cookieParser = require('cookie-parser');
// This is the start of the login stuff

const DB = require('./database.js');

// might need service port command line?

// JSON middleware
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// serve up application static content
app.use(express.static('public'));

// trust headers for ip address (look into this)
app.set('trust proxy', true);

// router for service endpoints

// createAuth token for new user

// set the cookie

// getauth token for the provided credentials

// deleteauth token if stored in cookie 

// Getuser returns information about a user

// secureApiRouter verifies credentials for endpoitns

// ddefault error handler

// setAuthcookie in the HTTP response 
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

