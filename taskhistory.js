var currentIndex = 0;
var numResults = 5;

function increaseResults() {
    numResults++;
    loadTaskhistory(currentIndex, currentIndex + numResults);
}

function decreaseResults() {
    numResults--;
    if (numResults < 0) {
        numResults = 0;
    }
    loadTaskhistory(currentIndex, currentIndex + numResults);
}

function loadNextResults() {
    currentIndex +=numResults;
    loadTaskhistory(currentIndex, currentIndex + numResults);

}

function loadPrevResults() {
    if (currentIndex > 0) {
    currentIndex -=numResults;
    loadTaskhistory(currentIndex, currentIndex + numResults);
    }

}

// load localStorage data into page
function loadTaskhistory(start, stop) {
    console.log("In loadTaskHIstroy");

    let tasks = [];
    const TaskhistoryText = localStorage.getItem('tasks');
    if (TaskhistoryText) {
        tasks = JSON.parse(TaskhistoryText);
    }
    console.log(tasks)


const tableBodyEl = document.querySelector('#tasks');
tableBodyEl.innerHTML = "";

if (tasks.length) {
    for (var i = start; i < stop; i++) {
        if (i >= tasks.length || i < 0) {
            continue;
        }
        var task = tasks[i];
        const taskTdEl= document.createElement('td');
        const projectTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');

        taskTdEl.textContent = task.task;
        projectTdEl.textContent = task.project;
        nameTdEl.textContent = task.name;
        dateTdEl.textContent = task.date;

        const rowEl = document.createElement('tr');
        rowEl.appendChild(taskTdEl);
        rowEl.appendChild(projectTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(dateTdEl);

        tableBodyEl.appendChild(rowEl);
    }
}
else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>No Task History</td></tr>';
} }

loadTaskhistory(currentIndex, numResults);