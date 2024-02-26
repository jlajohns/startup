// load localStorage data into page
function loadTaskhistory() {
    console.log("In loadTaskHIstroy");

    let tasks = [];
    const TaskhistoryText = localStorage.getItem('tasks');
    if (TaskhistoryText) {
        tasks = JSON.parse(TaskhistoryText);
    }
    console.log(tasks)


const tableBodyEl = document.querySelector('#tasks');

if (tasks.length) {
    for (const [i, task] of tasks.entries()) {
        const rowEl = document.createElement('tr');
        const taskTdEl = document.createElement('td');

        taskTdEl.textContent = task;
        rowEl.appendChild(taskTdEl);
        tableBodyEl.appendChild(rowEßl);
    }
}
else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>No Task History</td></tr>';
} }

loadTaskhistory();