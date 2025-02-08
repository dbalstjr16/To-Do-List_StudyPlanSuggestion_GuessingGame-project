const text = document.getElementById("submitText");
const taskBox = document.querySelector(".edit-delete-task");
const addButton = document.getElementById("addButton");

const API_URL = "http://localhost:3000/tasks";

async function loadTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tasksData => {
            taskBox.innerHTML = '';

            const taskHeader = document.createElement("div");
            taskHeader.id = "task-header"
            taskHeader.innerText = "Task List";
            taskBox.appendChild(taskHeader);

            tasksData.forEach((task) => {
                const taskElement = document.createElement("div");
                taskElement.className = "task-box";
                taskBox.appendChild(taskElement);

                const taskLabel = document.createElement("label");
                taskLabel.innerText = task.task;
                taskElement.appendChild(taskLabel);

                const taskButton1 = document.createElement("button")
                taskButton1.className = "edit";
                taskButton1.dataset.id = task.id;
                taskButton1.innerText = "Edit";
                taskElement.appendChild(taskButton1);

                const taskButton2 = document.createElement("button")
                taskButton2.className = "delete";
                taskButton2.dataset.id = task.id;
                taskButton2.innerText = "delete";
                taskElement.appendChild(taskButton2);
            });
        })
        .catch(error => console.error("Error fetching data: ", error));
}

async function addTask() {
    if (text.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: text.value })
    });

    text.value = "";
    loadTasks(); 
}

async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    loadTasks();
}

async function editTask(taskId, oldTask) {
    const newTask = prompt("Edit your task:", oldTask);
    if (newTask === null || newTask.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask })
    });

    loadTasks();
}

addButton.addEventListener("click", addTask);
taskBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        deleteTask(event.target.dataset.id);
    } else if (event.target.classList.contains("edit")) {
        const taskLabel = event.target.parentElement.querySelector("label").innerText;
        editTask(event.target.dataset.id, taskLabel);
    }
});

loadTasks();
