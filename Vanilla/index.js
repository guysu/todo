
let id = 0;

const DOMhtml = {
    newTask: '<div class="single_task" id="task_%id%"><input type="checkbox" class="checkbox" id="task_status_%id%"/> <span class="task_title" \
                id="task_title_%id%">%title%</span> \
                <button class="edit_btn" id="edit_btn_%id%">Edit</button> <button class="delete_btn" id="delete_%id%">Delete</button></div>',
    editElement: '<div class="edit_task" id="edit_task_%id%"> <input type="text" class="edit_input" id="edit_input_%id%"/>\
                <button class="save_btn" id="save_%id%">Save Changes</button></div>'
}

const DOMElems = {
    addTaskButtonClass: '.add_task_btn',
    addTaskInputClass: '.add_task_input',
    unfinishedTasksClass: '.unfinished_tasks',
    tasksContainerClass: '.tasks_container',
    editInputId: '#edit_input_',
    taskStatusId: '#task_status_',
    taskTitleId: '#task_title_',
    finishedTaskClass: 'finished_task',
    allUnfinishedTasksClass: '.unfinished_tasks',
    allFinishedTasksClass: '.finished_tasks'
}

document.querySelector(DOMElems.addTaskButtonClass).addEventListener('click', function() {
    // Creates new HTML task element if value is not empty
    let html = DOMhtml.newTask.replace(/%id%/g, id);                                        
    let inputDOM = document.querySelector(DOMElems.addTaskInputClass);                                    
    let textInput = inputDOM.value;
    if (textInput) {
        html = html.replace('%title%', textInput);    
        inputDOM.value = '';                                                                       
    
        // Inserts the element to DOM
        document.querySelector(DOMElems.unfinishedTasksClass).insertAdjacentHTML('beforeend', html);
        id++;
    }
})


document.querySelector(DOMElems.tasksContainerClass).addEventListener('click', function(event) {
    let eventID = event.target.id;

    if (eventID.startsWith('delete')) {             // For deleting task
        handleDelete(event);
    }
    else if (eventID.startsWith('task_status')) {   // For checking finished or unfinished task
        handleFinished(event); 
    }
    else if (eventID.startsWith('edit_btn')) {      // For entering edit mode
        handleEdit(event);
    }
    else if (eventID.startsWith('save')) {          // For saving changes
        handleSave(event);
        
    }
})

function handleSave(event) {
    let taskID = event.target.id.split("_")[1];

    //Creates task element and replpaces it
    let html = DOMhtml.newTask.replace(/%id%/g, taskID);
    let taskStatus = event.target.parentNode.parentNode.classList[0];
    let newTitle = document.querySelector(DOMElems.editInputId + taskID).value;
    html = html.replace("%title%", newTitle);
    let editedTaskElement = createHTMLElement(html);
    replaceTaskElement(event, editedTaskElement);

    //If task was originally finished, keeps it that way
    if (taskStatus.startsWith("finished")) {
        document.querySelector(DOMElems.taskStatusId + taskID).checked = true;
        document.querySelector(DOMElems.taskTitleId + taskID).classList.add(DOMElems.finishedTaskClass);
    }
}


function handleEdit(event) {
    let taskID = event.target.id.split("_")[2];
    editElementHtml = DOMhtml.editElement.replace(/%id%/g, taskID);
    let newElement = createHTMLElement(editElementHtml);
    
    //Adds existing title to input element
    let existingTitle = document.querySelector(DOMElems.taskTitleId + taskID).textContent;

    replaceTaskElement(event, newElement);
    let inputField = document.querySelector(DOMElems.editInputId + taskID);
    inputField.value = existingTitle;
    inputField.focus();
}

//Switch between display and edit mode
function replaceTaskElement(event, newElement) {
    let oldElement = document.querySelector("#" + event.target.parentNode.id);
    let parentClass = event.target.parentNode.parentNode.classList[0];
    document.querySelector("." + parentClass).replaceChild(newElement, oldElement);
}

// Returns a DOM element from HTML string
function createHTMLElement(htmlString) {
    var div = document.createElement('DIV');
    div.innerHTML = htmlString;
    return div.firstChild;
}


function handleFinished(event) {
    let eventID = event.target.id;
    let taskTitleID = eventID.split('_')[2];

    //Moves task to bottom of finished
    if (document.querySelector('#' + eventID).checked) {        
        document.querySelector(DOMElems.allFinishedTasksClass).appendChild(event.target.parentNode);
    }
    else {
        document.querySelector(DOMElems.allUnfinishedTasksClass).appendChild(event.target.parentNode);
    }

    //Adds line through if finished
    document.querySelector(DOMElems.taskTitleId + taskTitleID).classList.toggle(DOMElems.finishedTaskClass); 
}

function handleDelete(event) {
    let parentID = event.target.parentNode.id;
    document.querySelector('#' + parentID).remove();
}

