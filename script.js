const input = document.getElementById("input-task");
const submitBtn = document.getElementById("submit");
const form = document.getElementById("input-form");
const tasksDiv = document.getElementById("task-div");
const delAll= document.getElementById("del-all");



(function addSavedTasks(){
    const storedTasks = JSON.parse(localStorage.getItem("storedTasks"));
    if(storedTasks){
        storedTasks.forEach(task=>{
            // console.log(task)
            let newTask = `<div id="task-option" class="task-div center-div"> <button id="done">done</button><span id="span">
                        ${task.text}</span>
                         <button>remove</button></div>`;
        tasksDiv.innerHTML += newTask;
        })
    }
})();

function setTasksToLocalStorage(value){
    const taskObj = {
        text:value,
        checked:false,
    }
    const allTasks = JSON.parse(localStorage.getItem("storedTasks"));
    if(allTasks){
        allTasks.push(taskObj);
        localStorage.setItem("storedTasks", JSON.stringify(allTasks))
    }
    else{
        const allTasks = [];
        allTasks.push(taskObj);
        localStorage.setItem("storedTasks", JSON.stringify(allTasks))
    }
}

  


form.addEventListener("submit",function addTask(e){
    e.preventDefault();
    if(input.value === ""){
        alert("please write some task then submit");
    }
    else{
        let newTask = `<div id="task-option" class="task-div center-div"> <button id="done">done</button><span id="span">
                        ${input.value}</span>
                         <button>remove</button></div>`;
        tasksDiv.innerHTML += newTask;
        setTasksToLocalStorage(input.value);
        input.value="";

        
    }
});

tasksDiv.addEventListener("click", function done(e){
    if(e.target.innerHTML === "done"){
    
       const targetedTask = e.target.nextElementSibling;
       targetedTask.classList.toggle("checked");
       
    }
    else if(e.target.innerHTML === "remove"){
        const elementToRemove = e.target.parentElement;
        elementToRemove.remove();
        

    }
})

delAll.onclick = function(){
    const taskOptions = document.querySelectorAll(".task-div");
    taskOptions.forEach(item=>{
        item.remove();
    });
    localStorage.removeItem("storedTasks");  
}
