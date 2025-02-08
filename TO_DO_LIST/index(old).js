const text = document.getElementById("submitText");
const taskBox = document.querySelector(".edit-delete-task");
const addButton = document.getElementById("addButton");

const API_URL = "http://localhost:3000/tasks";


function addTask() {

    if(text.value.trim() === ""){
        alert("Please enter a task!");
        return;
    }

    const inputText = document.createElement("div");
    inputText.className = "task-box";
    inputText.innerHTML = `
        <label>${text.value}</label>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;
    taskBox.appendChild(inputText) 

    text.value = "";
}

addButton.addEventListener("click", addTask);

document.querySelector(".edit-delete-task").addEventListener("click", (event) => {
    
    if (event.target.classList.contains("delete")){
        const taskBox = event.target.parentElement;
        taskBox.remove();
    }

    if (event.target.classList.contains("edit")){
        const taskBox = event.target.parentElement;
        const label = taskBox.querySelector("label");
        const newTask = prompt("Edit your task:", label.textContent);
        if (newTask != null && newTask.trim() !== ""){
            label.textContent = newTask;
        }
        else {
            alert("Task cannot be empty!");
        }
    }
});