

var socket;
const AddTaskEvent = 'addTask';
const CompleteTaskEvent = 'completeTask';

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

// Add task 
function handleAddTask() {
    var inputText = document.getElementById("taskInput").value;
    console.log(inputText);
    var randomID = Math.random().toString(36).substring(2,10);

    addTask(inputText, randomID);
    this.broadcastEvent(inputText, randomID, 'addTask');

}



// async function to add a task to active tasks
async function addTask(text, randomID) {
    let newTask = {
        text: text,
        id: randomID,
    }
    try {
        const response = await fetch('/api/activetasks', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newTask),
        });
        const resp = await response
        // localStorage.setItem('tasks', JSON.stringify(newTask));
    } catch (error) {
        console.log("Error adding task");
        console.log(error);
    }

    addTaskHTML(text, randomID);
    // let other players know a task has been added 
}

async function getActiveTasks() {
    try {
        const response = await fetch('/api/activetasks', {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        });
        const tasks = await response.json();

        tasks.forEach(task => {
            addTaskHTML(task.text, task.id);
        });
        
    } catch (error) {
        console.log("Error adding task");
        console.log(error);
    }
}

function addTaskHTML(text, randomID) {
    const cs260taskList = document.querySelector('#cs260List');

    console.log("Adding task. . .")

    cs260taskList.innerHTML = `<li id=${randomID}><button class="deleteButton" onclick="deleteTaskButton(this)">Delete</button><button class="completebutton" onclick="completeTask(this)">Complete</button>${text}</li>` + cs260taskList.innerHTML;
}


// async function to add a task to task history
async function addTaskToHistory(task) {
    try {
        const response = await fetch('/api/taskhistory', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
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
        text: liText,
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
    this.broadcastEvent("idk", li.id, 'completeTask');
}

function deleteTaskHTML(id) {
    let deletedTask = document.getElementById(id);
    if (deletedTask) {
        const parentOfTask = deletedTask.parentNode;
        parentOfTask.removeChild(deletedTask);
    }
}


// Simulate tasks that will come over WebSocket
// setInterval(() => {
//     const cs260taskList = document.querySelector('#cs260List');
//     let tasks = [];
//     const TasksText = localStorage.getItem("CS260exampleTasks");
//     // console.log(TasksText);
//     if (TasksText) {
//         tasks = JSON.parse(TasksText);
//     }

//     var randomTaskNumber = Math.floor(Math.random() * tasks.length);

//     randomTaskText = tasks[randomTaskNumber];


//     var randomID = idGen;
//     var taskObject = {
//         id: randomID,
//         text: tasks[randomTaskNumber]
//     }

//     idGen++;

//     // console.log("Adding task. . .")

//     addTask(taskObject);

//     cs260taskList.innerHTML = `<li id=${randomID}><button class="deleteButton" onclick="deleteTaskButton(this)">Delete</button><button class="completebutton" onclick="completeTask(this)">Complete</button>${randomTaskText}</li>` + cs260taskList.innerHTML;

// }, 3000)


// Simulate tasks that will come over WebSocket
// setInterval(() => {
//     const neuroTaskList = document.querySelector('#neuroList');
//     let tasks = [];
//     const TasksText = localStorage.getItem("NeuroexampleTasks");

//     if (TasksText) {
//         tasks = JSON.parse(TasksText);
//     }

//     var randomTaskNumber = Math.floor(Math.random() * tasks.length);


//     const newListItem = document.createElement('li');

//     randomTaskText = tasks[randomTaskNumber];

//     var randomID = idGen;
//     var taskObject = {
//         id: randomID,
//         text: tasks[randomTaskNumber]
//     }

//     idGen++;
//     addTask(taskObject);
//     neuroTaskList.innerHTML = `<li id=${randomID}><button class="deleteButton" onclick="deleteTaskButton(this)">Delete</button><button class="completebutton" onclick="completeTask(this)">Complete</button>${randomTaskText}</li>` + neuroTaskList.innerHTML;

// }, 5000)

// third party socket

async function ThirdParty() {
    const response = await fetch("https://worldtimeapi.org/api/timezone/America/Denver");
    const time = await response.json();
    console.log(time);
    const dateP = document.querySelector("#currentdate");
    dateP.innerText = time.datetime;
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        console.log("Connected to websocketServer");
    };
    socket.onclose = (event) => {
        console.log("Disconnected from websocketServer");
    };
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        console.log("Received msg");
        console.log(msg)
        if (msg.type === CompleteTaskEvent) {
            deleteTaskHTML(msg.id);
        } else if (msg.type === AddTaskEvent) {
            console.log("Received AddTaskEvent");
            addTaskHTML(msg.text, msg.id);
        }
    };

}


function broadcastEvent(text, id, type) {
    const task = {
        text: text,
        id: id,
        type: type,
    };
    this.socket.send(JSON.stringify(task));
}

configureWebSocket();
getActiveTasks();


