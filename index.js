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
    console.log(tasks);
    // let tasks = [{task: "Take Midterm", project: "CS260", name: "Ethan", date: "02/04/2024"} , {task: "Add API to startup", project: "CS260", name: "Jascinda", date: "03/23/2024"} ,{task: "Read chapter 25", project: "Neurobiology", name: "Jascinda", date: "03/01/2024"}];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    let CS260exampleTasks = [ "Add Javascript Interactives", "Study promises", "Take midterm", "update Readme page", "Add css header on index page"];
    localStorage.setItem('CS260exampleTasks', JSON.stringify(CS260exampleTasks));
    let NeuroexampleTasks = ["read chapter rubric", "Quiz for case study 3", "Update Quizlet notes", "choose presentation partner", "read chapter 15"];
    localStorage.setItem('NeuroexampleTasks', JSON.stringify(NeuroexampleTasks));
    window.location.href = "index.html";
}

