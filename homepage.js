function deleteTask(button) {
    console.log("Deleting task!");
    var li = button.closest('li');
    if (li) {
        li.remove();
    }
}

function completeTask(button) {
    console.log("CompletedTask");
    let taskHistory = [];
    const TaskHistoryText = localStorage.getItem("tasks");
    if (TaskHistoryText) {
        taskHistory = JSON.parse(TaskHistoryText);
    }
    console.log(taskHistory);

    var li = button.closest('li');
    var liGroup = button.parentNode.parentNode.previousElementSibling;
    var liGroupText = liGroup.innerText;
    var liText = li.textContent;

    var newTask = {
        task: liText,
        project: liGroupText,
        name: "ExampleUser",
        date: "2/29/24"
    }
    taskHistory.push(newTask);

    // localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(taskHistory));
   

    console.log(taskHistory);

    deleteTask(button);


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

    // console.log(tasks.length);
    // console.log(tasks);
    var randomTaskNumber = Math.floor(Math.random() * tasks.length);
    // console.log(randomTaskNumber);


    randomTaskText = tasks[randomTaskNumber];
    // console.log(randomTaskText);

    cs260taskList.innerHTML = `<li><button class="deleteButton" onclick="deleteTask(this)">Delete</button><button class="completebutton" onclick="completeTask(this)">Complete</button>${randomTaskText}</li>` + cs260taskList.innerHTML;

    }, 3000)


// Simulate tasks that will come over WebSocket
setInterval(() => {
    const neuroTaskList = document.querySelector('#neuroList');
    let tasks = [];
    const TasksText = localStorage.getItem("NeuroexampleTasks");
    // console.log(TasksText);
    if (TasksText) {
        tasks = JSON.parse(TasksText);
    }

    // console.log(tasks.length);
    // console.log(tasks);
    var randomTaskNumber = Math.floor(Math.random() * tasks.length);
    // console.log(randomTaskNumber);

    const newListItem = document.createElement('li');

    randomTaskText = tasks[randomTaskNumber];
    // console.log(randomTaskText);
    //newListItem.innerText = randomTaskText;
    neuroTaskList.innerHTML = `<li><button class="deleteButton" onclick="deleteTask(this)">Delete</button><button class="completebutton" onclick="completeTask(this)">Complete</button>${randomTaskText}</li>` + neuroTaskList.innerHTML;


    neuroTaskList.appendChild(newListItem);
    }, 5000)
