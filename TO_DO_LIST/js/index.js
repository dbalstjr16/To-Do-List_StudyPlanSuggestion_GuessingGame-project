const text = document.getElementById("submitText");
const taskBox = document.querySelector(".edit-delete-task");
const addButton = document.getElementById("addButton");

const API_URL = "http://localhost:5000/tasks";

async function loadTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tasksData => {
            taskBox.innerHTML = '';

            const taskHeader = document.createElement("div");
            taskHeader.id = "task-header";
            taskHeader.classList.add("text-center", "fw-bold", "py-2");
            taskHeader.innerText = "Task List";
            taskBox.appendChild(taskHeader);

            const taskContainerWrapper = document.createElement("div");
            taskContainerWrapper.classList.add("container-fluid", "d-flex", "justify-content-center");
            taskBox.appendChild(taskContainerWrapper);

            const taskContainer = document.createElement("div");
            taskContainer.classList.add("w-100", "mx-auto");
            taskContainer.style.maxWidth = "1500px";
            taskContainerWrapper.appendChild(taskContainer);

            const columnRow = document.createElement("div");
            columnRow.classList.add("row", "fw-bold", "border-bottom", "py-2", "mb-2", "w-100", "mx-auto", "text-center");

            const colTaskName = document.createElement("div");
            colTaskName.classList.add("col-4");
            colTaskName.innerText = "Task Name";

            const colTimeRemaining = document.createElement("div");
            colTimeRemaining.classList.add("col-4");
            colTimeRemaining.innerText = "Time Remaining";

            const colActions = document.createElement("div");
            colActions.classList.add("col-4");
            colActions.innerText = "Actions";

            columnRow.appendChild(colTaskName);
            columnRow.appendChild(colTimeRemaining);
            columnRow.appendChild(colActions);
            taskContainer.appendChild(columnRow);

            tasksData.forEach((task) => {
                const taskRow = document.createElement("div");
                taskRow.classList.add("row", "task-item", "mb-2", "p-3", "border", "rounded", "bg-light", "align-items-center", "text-center", "w-100", "mx-auto");
                taskRow.style.maxWidth = "1500px";

                const taskName = document.createElement("div");
                taskName.classList.add("col-4", "task-name", "fw-bold");
                taskName.innerText = task.task_name;

                const taskTime = document.createElement("div");
                taskTime.classList.add("col-4", "task-time");

                let timeLeftText = "Unknown";
                
                const dueDate = new Date(task.date);
                if (!isNaN(dueDate)) {
                    const now = new Date();
                    const timeDiff = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
                    timeLeftText = timeDiff >= 0 ? `${timeDiff} days left` : "Overdue";
                }
                
                taskTime.innerText = timeLeftText;

                const taskButton = document.createElement("div");
                taskButton.classList.add("col-4", "task-actions");

                const editButton = document.createElement("button");
                editButton.classList.add("btn", "btn-warning", "edit-btn", "mx-1");
                editButton.dataset.id = task.id;
                editButton.innerText = "Edit";
                editButton.addEventListener("click", function () {
                    editTask(task.id, task.task_name, task.date);
                });

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("btn", "btn-danger", "delete-btn");
                deleteButton.dataset.id = task.id;
                deleteButton.innerText = "Delete";
                deleteButton.addEventListener("click", function () {
                    deleteTask(task.id);
                });

                taskButton.appendChild(editButton);
                taskButton.appendChild(deleteButton);

                taskRow.appendChild(taskName);
                taskRow.appendChild(taskTime);
                taskRow.appendChild(taskButton);

                taskContainer.appendChild(taskRow);
            });
        })
        .catch(error => console.error("Error fetching data: ", error));
}

async function addTask() {
    if (text.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }
    
    //CS571 HW1 due 2025-02-09
    const parts = text.value.split(" due ");
    parts[0] = parts[0].trim();
    parts[1] = parts[1].trim();

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_name: parts[0], date: parts[1] })
    });

    text.value = "";
    loadTasks(); 
}

async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    loadTasks();
}

async function editTask(taskId, oldTask, oldDate) {
    const newTask = prompt("Edit your task name:", oldTask);
    const newDate = prompt("Edit your task due date:", oldDate);

    if (newTask === null || newTask.trim() === "" || newDate === null || newDate.trim() === "") {
        alert("Either task name or date was empty, try again!");
        return;
    }

    await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_name: newTask, date: newDate })
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
