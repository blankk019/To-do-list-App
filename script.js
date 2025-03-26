'use strict;'

document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); 
});

const myAddBtn = document.getElementById("myAddBtn");
let tasks = [];

myAddBtn.addEventListener("click", () => {
    const myTask = document.getElementById("Enter-task").value;
    if (myTask.trim() !== "") { 
        createDiv(myTask);
        tasks.push(myTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById("Enter-task").value = "";
        

    }
});

//showcase the current number of tasks
displayCount();
//function to dynamically create divs based on the user input
function createDiv(task) {
    const displayDiv = document.getElementById("displayDiv");
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");
    taskDiv.style.cssText = "display:block; justify-content:space-between; align-items:center; margin: 10px 0; padding: 10px; border: 1px solid black; background-color: antiquewhite; border-radius:10px;";


    const taskText = document.createElement("p");
    taskText.textContent = task;
    taskText.style.marginRight = "130px";
    taskText.style.display = "inline-block";
    taskText.style.width = "140px";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "🗑️"; 
    deleteButton.style.cursor = "pointer";
    deleteButton.style.padding = "5px"
    deleteButton.marginLeft = "10px";

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = "🖊️";
    editBtn.style.cursor = "pointer";
    editBtn.style.padding = "5px"


    taskDiv.appendChild(taskText);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteButton);
    displayDiv.appendChild(taskDiv);

    editBtn.addEventListener("click", (event)=> {
        const editedValue = document.getElementById("Enter-task").value;
        if (editedValue.trim() !== ""){
            tasks.forEach((element, index)=>{
                if(element == taskText.textContent){
                    tasks[index] = editedValue;
                }
            })
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskText.textContent = editedValue;
            document.getElementById("Enter-task").value = "";

        }
    })

    deleteButton.addEventListener("click", (event) => {
        tasks.forEach((element, index)=>{
            if(element == taskText.textContent){
                tasks.splice(index, 1);
            }
        })
        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.target.parentElement.remove();
        displayCount();
    });
    displayCount();
}
//clear button functionality
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    document.getElementById("displayDiv").innerHTML = "";
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayCount();
});
//a function to showcase the count of tasks
function displayCount(){
    const countDiv = document.querySelector("#countDiv p");
    const count = document.querySelectorAll(".task-item").length;
    countDiv.innerHTML = `You have <span style="color: tomato; font-weight: bold;">${count}</span> Tasks To Do`;
    countDiv.style.color = "white";
    countDiv.style.padding = "5px";
}

//load tasks from local storage
function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createDiv);
    displayCount(); 
}
