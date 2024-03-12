var currentIndex = 0;
var numResults = 5;
var taskHistory = [];

function increaseResults() {
    numResults++;
    loadTaskHistory(currentIndex, currentIndex + numResults);
}

function decreaseResults() {
    numResults--;
    if (numResults < 0) {
        numResults = 0;
    }
    loadTaskHistory(currentIndex, currentIndex + numResults);
}

function loadNextResults() {
    currentIndex +=numResults;
    loadTaskHistory(currentIndex, currentIndex + numResults);

}

function loadPrevResults() {
    if (currentIndex > 0) {
    currentIndex -=numResults;
    loadTaskHistory(currentIndex, currentIndex + numResults);
    }

}

async function loadTaskHistory() {
    try {
        // get scores from service
        const response = await fetch('/api/taskhistoryquery', {
            method:'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify([currentIndex, currentIndex + numResults]),

            
        });
        taskHistory = await response.json();

        // save scores in case of offline 
        localStorage.setItem('taskHistory', JSON.stringify(taskHistory));
        } catch (error) {
            // const taskHistoryText = localStorage.getitem('taskHistory');
            // if (taskHistoryText) {
            //     taskHistory = JSON.parse(taskHistoryText);
            // }
            console.log(error)
        }

    displayTaskHistory()
}
// load localStorage data into page OLD VERSION
/*
function oldLoadTaskhistory(start, stop) {
    console.log("In loadTaskHIstroy");

    let tasks = [];
    const TaskhistoryText = localStorage.getItem('tasks');
    if (TaskhistoryText) {
        tasks = JSON.parse(TaskhistoryText);
    }
    console.log(tasks);
}
*/

function displayTaskHistory() {


const tableBodyEl = document.querySelector('#tasks');
tableBodyEl.innerHTML = "";

if (taskHistory.length) {
    for (var i = 0; i < taskHistory.length; i++) {
        if (i >= taskHistory.length || i < 0) {
            continue;
        }
        var task = taskHistory[i];
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

loadTaskHistory(currentIndex, numResults);