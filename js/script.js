let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskinput = document.querySelector('#new_task');

// definig event 
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

// defining function
function addTask(e){
    if(taskinput.value === ''){
        alert('Add a task!!');
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskinput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);
        taskList.appendChild(li);

        // store task 
        storeTaskInLocalStorage(taskinput.value);
        taskinput.value = '';
    } 
    e.preventDefault();
}

// remove task 
function removeTask(e) {
    if(e.target.hasAttribute("href")){
        if(confirm('are you sure!!!')){
            let ele = e.target.parentElement;
            ele.remove();

            removeFromLS(ele);
        }
    }
}


// clear task

function clearTask(e) {
    // taskList.innerHTML = '';
   if(confirm('Delete all!!!')){
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
   }
}


// filter Task
function filterTask(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
};

// store in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
       
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(task + " "));
            let link = document.createElement('a');
            link.setAttribute('href', '#');
            link.innerHTML = 'X';
            li.appendChild(link);
            taskList.appendChild(li);
    });
};

// 
function removeFromLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};