
const input = document.getElementById("input-task");
const submitBtn = document.getElementById("submit");
const form = document.getElementById("input-form");
const tasksDiv = document.getElementById("task-div");
const delAll = document.getElementById("del-all");

// Function to add saved tasks to the DOM
(function addSavedTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
    if (storedTasks) {
        storedTasks.forEach((task, index) => {
            let newTask = `<div id="task-option" class="task-div center-div">
                             <button id="done" data-index="${index}">done</button>
                             <span id="span" class="${task.checked ? 'checked' : ''}">${task.text}</span>
                             <button id="remove" data-index="${index}">remove</button>
                           </div>`;
            tasksDiv.innerHTML += newTask;
        });
    }
})();

// Function to set tasks to local storage
function setTasksToLocalStorage(value, checked = false) {
    const taskObj = {
        text: value,
        checked: checked,
    };
    const allTasks = JSON.parse(localStorage.getItem("storedTasks")) || [];
    allTasks.push(taskObj);
    localStorage.setItem("storedTasks", JSON.stringify(allTasks));
}

// Function to update task status in local storage
function updateTaskStatusInLocalStorage(index, checked) {
    const allTasks = JSON.parse(localStorage.getItem("storedTasks"));
    if (allTasks && allTasks[index]) {
        allTasks[index].checked = checked;
        localStorage.setItem("storedTasks", JSON.stringify(allTasks));
    }
}

// Function to remove task from local storage
function removeTaskFromLocalStorage(index) {
    let savedTasks = JSON.parse(localStorage.getItem("storedTasks")) || [];
    savedTasks.splice(index, 1);
    localStorage.setItem("storedTasks", JSON.stringify(savedTasks));
}

// Event listener to add a new task
form.addEventListener("submit", function addTask(e) {
    e.preventDefault();
    if (input.value === "") {
        alert("please write some task then submit");
    } else {
        const index = JSON.parse(localStorage.getItem("storedTasks"))?.length || 0;
        let newTask = `<div id="task-option" class="task-div center-div">
                         <button id="done" data-index="${index}">done</button>
                         <span id="span">${input.value}</span>
                         <button id="remove" data-index="${index}">remove</button>
                       </div>`;
        tasksDiv.innerHTML += newTask;
        setTasksToLocalStorage(input.value);
        input.value = "";
    }
});

// Event listener to mark a task as done or remove a task
tasksDiv.addEventListener("click", function handleTask(e) {
    const target = e.target;
    const index = target.dataset.index;
    if (target.id === "done") {
        const targetedTask = target.nextElementSibling;
        targetedTask.classList.toggle("checked");
        updateTaskStatusInLocalStorage(index, targetedTask.classList.contains("checked"));
    } else if (target.id === "remove") {
        const elementToRemove = target.parentElement;
        elementToRemove.remove();
        removeTaskFromLocalStorage(index);
    }
});

// Event listener to delete all tasks
delAll.onclick = function() {
    const taskOptions = document.querySelectorAll(".task-div");
    taskOptions.forEach(item => {
        item.remove();
    });
    localStorage.removeItem("storedTasks");
};
