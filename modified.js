let inputBox = document.getElementById('input-box')
let progressUl = document.getElementById('inprogress-tasks')
let completedUl = document.getElementById('completed-tasks')


let taskArr = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('done')) || [];


function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskArr))
    localStorage.setItem('done', JSON.stringify(completedTasks))
}

window.addEventListener('load', function(){
    runProgressAndCompleted()
})

function creationOfLi(tasksArray, destinationUl) {
    tasksArray.forEach(function(value) {
                //create li element
                let createLi = document.createElement('li');

                //create input element for checkbox
                let createInput = document.createElement('input')
                createInput.type = 'checkbox'

                //create label for the li element (cannot display text if without label and assign input to label content)
                let label = document.createElement('label')
                label.textContent = value

                let deleteBtn = document.createElement('button')
                deleteBtn.textContent = "Delete"

                createLi.appendChild(createInput)
                //append label
                createLi.appendChild(label)
                //append li to document
                destinationUl.appendChild(createLi)
                createLi.appendChild(deleteBtn)
                saveToLocalStorage()
                    if (destinationUl === completedUl) {
                    createInput.checked = true
                    }
                //checkbox eventlistener
                createInput.addEventListener('change', function() {
                    if (createInput.checked) {
                        // Move the li element to the completed tasks container
                        completedTasks.push(label.textContent)
                        completedUl.appendChild(createLi);
                        let indexOfRemovingItem = taskArr.indexOf(label.textContent)
                        taskArr.splice(indexOfRemovingItem, 1)
                        saveToLocalStorage()
                    } else {
                        // Move the li element back to the in-progress tasks container
                        taskArr.push(label.textContent)
                        progressUl.appendChild(createLi);
                        let indexOfRemovingItem = completedTasks.indexOf(label.textContent)
                        completedTasks.splice(indexOfRemovingItem, 1)
                        saveToLocalStorage()
                    }
                });
                deleteBtn.addEventListener('click', () => {
                    tasksArray.forEach(function(item) {
                        if (label.textContent == item) {
                            let itemIndex = tasksArray.indexOf(item)
                            tasksArray.splice(itemIndex, 1)
                            createLi.remove()
                            saveToLocalStorage()
                        }
                    })
                })
            })
            saveToLocalStorage()
}

function addTask() {
    if (inputBox.value === '') {
        alert('please enter a task')
    } else {
        //add the input value to task array
        taskArr.push(inputBox.value)
        progressUl.textContent = ""
        completedUl.textContent = ""
        runProgressAndCompleted()
        inputBox.value = ""
        saveToLocalStorage()
}
}

function runProgressAndCompleted() {
    creationOfLi(taskArr, progressUl);
    creationOfLi(completedTasks, completedUl)
}

function deleteAll() {
    taskArr = []
    completedTasks = []
    progressUl.textContent = ''
    completedUl.textContent = ''
    saveToLocalStorage()
}