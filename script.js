const addButton = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("task-container");
const taskField = document.getElementById("new-task-input");
const clearTaskButton = document.getElementById("clear-tasks-btn");
let deleteBtns = document.getElementsByClassName('delete-btn');
let checkboxes = document.getElementsByClassName('checkbox');
let notificationDiv = document.getElementById('notification-container');


addButton.addEventListener("click", addTask);
taskField.addEventListener("keydown", (event) => {
    if(event.key == 'Enter') {
        addTask();
    }
});

function addTask() {
    if(taskField.value != '') {
        let taskText = taskField.value;
        newTaskDiv = document.createElement('div');
        newTaskDiv.innerHTML = `
         <div class="task-div">
            <label class="text-label" for="checkbox"><input class="checkbox" type="checkbox">${taskText}</label>
            <button class="delete-btn" onclick="deleteTask(this)">x</button>
        </div>
    </div>
            `
        taskContainer.prepend(newTaskDiv);
        taskField.value = ``;
        deleteBtns = document.getElementsByClassName('delete-btn');
        checkboxes = document.getElementsByClassName('checkbox');
        addLineThrough();
        taskAddedNotification();
    } else {
        clearTimeout(notificationTimer);
        notificationDiv.style.opacity = '100%'
        notificationDiv.style.fontSize = '1.5rem'
        notificationDiv.style.backgroundColor = 'red';
        notificationDiv.style.color = 'darkred';
        notificationDiv.textContent = 'Task Field cannot be empty!';
        var notificationTimer =  setTimeout(() => {
        }, 2500);
    }
};

clearTaskButton.addEventListener("click", (event) => {
    clearTimeout(notificationTimer);
    taskContainer.innerHTML = '';
    notificationDiv.style.opacity = '100%'
    notificationDiv.style.fontSize = '1.5rem'
    notificationDiv.style.backgroundColor = '#cb2704';
    notificationDiv.style.color = 'orange';
    notificationDiv.textContent = 'All tasks cleared!';
    var notificationTimer =  setTimeout(() => {
        notificationDiv.style.opacity = '0%';
    }, 2500);
})

function deleteTask(element) {
    let parentElement = element.parentElement;
    taskDeletedNotification();
    parentElement.remove();
}

function addLineThrough() {
    
Array.from(checkboxes).forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if(checkbox.checked) {
            checkbox.parentElement.classList.add('line-through');
            let checkboxParent = checkbox.parentElement;
            checkboxParent.parentElement.style.backgroundColor = 'lightgreen';
            checkbox.parentElement.parentElement.style.backgroundColor = 'lightgreen';
            let nextSibling = checkbox.nextSibling;
            nextSibling.style.backgroundColor = 'lightgreen';
            
        } else {
            checkbox.parentElement.classList.remove('line-through');
            let checkboxParent = checkbox.parentElement;
            checkboxParent.parentElement.style.backgroundColor = 'white';
        }
     })
    })
    
}

function taskAddedNotification() {
    clearTimeout(notificationTimer);
    notificationDiv.style.opacity = '100%'
    notificationDiv.style.fontSize = '1.5rem'
    notificationDiv.style.backgroundColor = 'lightgreen';
    notificationDiv.style.color = 'darkgreen';
    notificationDiv.textContent = 'Task Added!';
    var notificationTimer =  setTimeout(() => {
        notificationDiv.style.opacity = '0%';
    }, 2500);
}

function taskDeletedNotification() {
    clearTimeout(notificationTimer);
    notificationDiv.style.opacity = '100%'
    notificationDiv.style.fontSize = '1.5rem'
    notificationDiv.style.backgroundColor = 'orange';
    notificationDiv.style.color = '#cb2704';
    notificationDiv.textContent = 'Task removed!';
    var notificationTimer =  setTimeout(() => {
        notificationDiv.style.opacity = '0%';
    }, 2500);
}