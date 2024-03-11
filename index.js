function login() {
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

//endpoint for add new task (post)
// apiRouter.post('/task', (req, res) => {
//     tasks = updateTasks(req.body, tasks);
//     res.send(tasks);
// });

// ACTIVE TASKS
    // Add a new task
apiRouter.post('/active-tasks', (req, res) => {
    addToActiveTasks(req.body, activeTasks);
    res.send();
});

    // delete a task
    // expect array in body
apiRouter.delete('/active-tasks', (req, res) => {
    deleteFromActiveTasks(req.body, activeTasks);
    res.send();
});
    // get a list of active tasks
apiRouter.get('/active-tasks' , (req, res) => {
    res.send(activeTasks);
});
// TASK HISTORY
    // get a list of task history
apiRouter.get('/task-history' , (req, res) => {
    subsetTasks = getTaskHistory(req.body[0], req.body[1], taskHistory);
    res.send(subsetTasks);
});
    // add an item to task history
apiRouter.post('/task-history' , (req, res) => {
    addToTaskHistory(req.body, taskHistory);
    res.send();
});

// Return application default page if path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});


    console.log(tasks);
    // let tasks = [{task: "Take Midterm", project: "CS260", name: "Ethan", date: "02/04/2024"} , {task: "Add API to startup", project: "CS260", name: "Jascinda", date: "03/23/2024"} ,{task: "Read chapter 25", project: "Neurobiology", name: "Jascinda", date: "03/01/2024"}];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    let CS260exampleTasks = [ "Add Javascript Interactives", "Study promises", "Take midterm", "update Readme page", "Add css header on index page"];
    localStorage.setItem('CS260exampleTasks', JSON.stringify(CS260exampleTasks));
    let NeuroexampleTasks = ["read chapter rubric", "Quiz for case study 3", "Update Quizlet notes", "choose presentation partner", "read chapter 15"];
    localStorage.setItem('NeuroexampleTasks', JSON.stringify(NeuroexampleTasks));
    window.location.href = "index.html";
}

let tasks = [];
function updateTasks(newTask, tasks) {
    tasks.push(newTask);
    return tasks;
}

function completetask(task, taskhistory) {
    const taskId = req.body.id;
    const completedTaskIndex = activeTasks.findIndex(task => task.id === taskId);

}

function addToActiveTasks(newTask, activeTasks) {
    activeTasks.push(newTask);
}

function deleteFromActiveTasks(taskToDelete, activeTasks) {
    activeTasks = activeTasks.filter(task => task.id !== taskToDelete.id)
}

function getTaskHistory(start, stop, taskHistory) {
    return taskHistory.slice(start, stop);
}

function addToTaskHistory(task, taskHistory) {
    taskHistory.push(task);
}