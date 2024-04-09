import React from 'react';

import './taskhistory.css';

export function Taskhistory() {
    const [tasks, setTasks] = React.useState([]);
}

// Calling a service asynchronously so that 
//React can properly update state objects with results

React.useEffect(() => {
    fetch('/api/tasks')
    .then((response) => response.json())
    .then((tasks) => {
        setTasks(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })
    .catch(() =>  {
        const tasksText = localStorage.getItem('tasks');
        if (tasksText) {
            setTasks(JSON.parse(tasksText));
        }
    });
}, []);

// rendering array 
const taskRows = [];
if (tasks.length) {
    for (const [i, task] of tasks.entries()) {
        tasksRows.push(
            <tr key = {i}>
                <td>{i}</td>
                <td>{task.task}</td>
                <td>{task.project}</td>
                <td>{task.name}</td>
                <td>{task.date}</td>
            </tr>
        );
    }
} else {
    taskRows.push(
        <tr key='0'>
            <td colSpan='4'>Completed tasks will apear here</td>
        </tr>
    );
}

// Figure out the buttons (this isn't the way to do it in react)

return (
    <main>
        <button onclick="loadPrevResults()">Previous</button>
        <button onclick="loadNextResults()">Next</button>
        <button onclick="increaseResults()">Add Result</button>
        <button onclick="decreaseResults()">Remove Result</button>


        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Project</th>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="tasks">

          </tbody>
        </table>
      </main>
)