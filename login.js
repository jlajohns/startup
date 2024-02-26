function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    let tasks = ["Wash Dishes" , "Add API to startup" , "Walk the Dog"];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.href = "index.html";
}