
var idGen = 0;
// delete task text function with button click
async function deleteTaskButton(button) {
    console.log("Deleting task!");
    var li = button.closest('li');
    if (li) {
        li.remove();
    }

    var idObject = {
        id: li.id
    }

    deleteTask(idObject);
}

// delete task function
async function deleteTask(idObject) {

    try {
        const response = await fetch('/api/activetasks', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(idObject),
        });

        // Store what the service gave us 
        const scores = await response;

    } catch {
        // If there was an error then just track scores locally
        console.log("Error in generating task");
    }


}




// async function to add a task to active tasks
async function addTask(text) {
    try{
    const response = await fetch('/api/activetasks', { 
        method: 'POST', 
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(text),
    });
    const newTask = await response
    // localStorage.setItem('tasks', JSON.stringify(newTask));
} catch (error) {
    console.log("Error adding task");
    console.log(error);
}}

// async function to add a task to task history
async function addTaskToHistory(task) {
        try{
        const response = await fetch('/api/taskhistory', { 
            method: 'POST', 
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(task),
        });
        const newTask = await response
        localStorage.setItem('tasks', JSON.stringify(newTask));
    } catch {
        console.log("Error adding task");
    }
}


// function to add task to task history and delete from active when button is pressed
function completeTask(button) {

    var li = button.closest('li');
    var liGroup = button.parentNode.parentNode.previousElementSibling;
    var liGroupText = liGroup.innerText;
    var liText = li.textContent;

    if (li) {
        li.remove();
    }

    var idObject = {
        id: li.id
    }

    deleteTask(idObject);


    var newTask = {
        task: liText,
        project: liGroupText,
        name: "ExampleUser",
        date: "2/29/24"
    }
    addTaskToHistory(newTask);
}


// Simulate tasks that will come over WebSocket
setInterval(() => {
    const cs260taskList = document.querySelector('#cs260List');
    let tasks = [];
    const TasksText = localStorage.getItem("CS260exampleTasks");
    // console.log(TasksText);
    if (TasksText) {
        tasks = JSON.parse(TasksText);
    }

    var randomTaskNumber = Math.floor(Math.random() * tasks.length);

    randomTaskText = tasks[randomTaskNumber];


    var randomID = idGen;
    var taskObject = {
        id: randomID,
        text: tasks[randomTaskNumber]
    }
    
    idGen++;

    // console.log("Adding task. . .")

    addTask(taskObject);

    cs260taskList.innerHTML = `<li id=${randomID}><button class="deleteButton" onclick="deleteTaskButton(this)">Delete</button><button class="completebutton" onclick="completeTask(this)">Complete</button>${randomTaskText}</li>` + cs260taskList.innerHTML;

}, 3000)


// Simulate tasks that will come over WebSocket
setInterval(() => {
    const neuroTaskList = document.querySelector('#neuroList');
    let tasks = [];
    const TasksText = localStorage.getItem("NeuroexampleTasks");

    if (TasksText) {
        tasks = JSON.parse(TasksText);
    }

    var randomTaskNumber = Math.floor(Math.random() * tasks.length);


    const newListItem = document.createElement('li');

    randomTaskText = tasks[randomTaskNumber];

    var randomID = idGen;
    var taskObject = {
        id: randomID,
        text: tasks[randomTaskNumber]
    }

    idGen++;
    addTask(taskObject);
    neuroTaskList.innerHTML = `<li id=${randomID}><button class="deleteButton" onclick="deleteTaskButton(this)">Delete</button><button class="completebutton" onclick="completeTask(this)">Complete</button>${randomTaskText}</li>` + neuroTaskList.innerHTML;

}, 5000)

// third party socket

async function ThirdParty() {
    const response = await fetch("https://worldtimeapi.org/api/timezone/America/Denver");
    const time = await response.json();
    console.log(time);
    const dateP = document.querySelector("#currentdate");
    dateP.innerText = time.datetime;
  }