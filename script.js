const input = document.getElementById("input-task");
const task = document.getElementById("task-div");
const submitBtn = document.getElementById("submit");
const form = document.getElementById("input-form");
const taskDiv = document.getElementById("task-div");
const delAll= document.getElementById("del-all");






// submitBtn.addEventListener("click",function addTask(e){
//     e.preventDefault();
//     if(input.value === ""){
//         alert("please write some task then submit");
//     }
//     else{
//         let newTask = `<div class="task-div center-div"> <button id="done">done</button><span id="span">${input.value}</span>
//                          <button>remove</button></div>`;
//         task.innerHTML += newTask;
//         input.value="";
//     }
// });
form.addEventListener("submit",function addTask(e){
    e.preventDefault();
    if(input.value === ""){
        alert("please write some task then submit");
    }
    else{
        let newTask = `<div id="task-option" class="task-div center-div"> <button id="done">done</button><span id="span">
                        ${input.value}</span>
                         <button>remove</button></div>`;
        task.innerHTML = newTask + task.innerHTML;
        input.value="";
    }
});

taskDiv.addEventListener("click", function done(e){
    if(e.target.innerHTML === "done"){
    //    let targetedTask = e.target.parentElement.querySelector("#span");
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
    console.log(taskOptions)
    taskOptions.forEach(item=>{
        item.remove()
    })
}

