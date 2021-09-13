let taskList = [];
let list = document.getElementById("task-list");

getFromLocalStorage();

let addTaskButton = document.getElementById('add-task-button');
addTaskButton.addEventListener("click", function(){
    const input = document.getElementById('input-task').value;
    if(input !== "") {
        const todo = {
            text: input,
            complete: false
        }
        taskList.push(todo);
        addToLocalStorage();
        document.getElementById('input-task').value = null;
    }
});

document.getElementById('input-task').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        const input = document.getElementById('input-task').value;
        if(input !== "") {
            const todo = {
                text: input,
                complete: false
            }
            taskList.push(todo);
            addToLocalStorage();
            document.getElementById('input-task').value = null;
        }
    }
});

list.addEventListener('click', function(e){
    if(e.target.classList.contains('delete-btn')){
        let i = 0;
        while(taskList[i].text !== e.target.previousSibling.textContent){
            i++;
        }
        taskList.splice(i, 1);
        addToLocalStorage();
    }
});

list.addEventListener('change', function(e) {
    if(e.target.checked){
        let i = 0;
        while(taskList[i].text !== e.target.nextSibling.textContent){
            i++;
        }
        taskList[i].complete = true;
    }
    else{
       let i = 0;
       while(taskList[i].text !== e.target.nextSibling.textContent){
           i++;
       }
       taskList[i].complete = false;
    }
    addToLocalStorage();
});

function getFromLocalStorage(){
    const reference = localStorage.getItem("tasks");
    if(reference){
        taskList = JSON.parse(reference);
    }
    else{
        let listItems = list.getElementsByTagName("li");
        for(let i = 0; i < listItems.length; i++){
            const todo = {
                text: listItems[i].querySelector("span").innerText,
                complete: listItems[i].querySelector("input").checked
            }
            taskList.push(todo);
        }
    }
    render();
}

function addToLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(taskList));
    render()
}

function render(){
    list.innerHTML = '';
    for(let i = 0; i < taskList.length; i++){
        const span = document.createElement("span");
        span.innerText = taskList[i].text;
        span.classList.add("task");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        if(taskList[i].complete === true){
            span.style.textDecoration = "line-through";
            checkbox.checked = true;
        }
        else{
            span.style.textDecoration = "none";
            checkbox.checked = false;
        }
        const label = document.createElement("label");
        label.appendChild(checkbox);
        label.appendChild(span);
        label.classList.add("checkbox");
        const button = document.createElement("button");
        button.classList.add("delete-btn");
        const li = document.createElement("li");
        li.appendChild(label);
        li.appendChild(button);
        const list = document.getElementById("task-list");
        list.appendChild(li);
    }
}