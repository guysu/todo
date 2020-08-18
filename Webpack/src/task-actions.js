import * as index from "./index";

export function handleDelete(event) {
    const parentID = event.target.parentNode.id;
    index.$("#" + parentID).remove();
    const taskID = extractID(event);
    localStorage.removeItem(taskID);
}

export function handleCheck(event) {
    const eventID = event.target.id;
    const taskTitleID = extractID(event);
    index.$("#" + eventID).checked
        ? appendToFinished(event)
        : appendToUnfinished(event);
    getTask(taskTitleID).classList.toggle(index.DOMElems.finishedTaskClass);
    checkTaskInLS(taskTitleID);
}

function checkTaskInLS(taskTitleID) {
    let taskInfo = JSON.parse(localStorage.getItem(taskTitleID));
    taskInfo.checked = !taskInfo.checked;
    localStorage.setItem(taskTitleID, JSON.stringify(taskInfo));
}

function appendToUnfinished(event) {
    index
        .$(index.DOMElems.unfinishedTasksClass)
        .appendChild(event.target.parentNode);
}

function appendToFinished(event) {
    index
        .$(index.DOMElems.allFinishedTasksClass)
        .appendChild(event.target.parentNode);
}

export function handleEdit(event) {
    const taskID = extractID(event);
    const editElementHtml = index.DOMhtml.editElement.replace(/%id%/g, taskID);
    const newElement = createHTMLElement(editElementHtml);
    const existingTitle = getTask(taskID).textContent;
    replaceTaskElement(event, newElement);
    const saveBtnID = index.DOMElems.saveBtn + taskID;
    index.addOnClickHandler(saveBtnID, handleSave);
    let inputField = index.$(index.DOMElems.editInputId + taskID);
    inputField.value = existingTitle;
    inputField.focus();
}

function extractID(event) {
    return event.target.id.split("_")[1];
}

function replaceTaskElement(event, newElement) {
    const oldElement = index.$("#" + event.target.parentNode.id);
    const parentClass = event.target.parentNode.parentNode.classList[0];
    index.$("." + parentClass).replaceChild(newElement, oldElement);
}

function createHTMLElement(htmlString) {
    var div = document.createElement("DIV");
    div.innerHTML = htmlString;
    return div.firstChild;
}

export function handleSave(event) {
    const taskID = extractID(event);
    let html = index.DOMhtml.newTask.replace(/%id%/g, taskID);
    const taskStatus = event.target.parentNode.parentNode.classList[0];
    const newTitle = index.$(index.DOMElems.editInputId + taskID).value;
    html = html.replace("%title%", newTitle);
    const editedTaskElement = createHTMLElement(html);
    replaceTaskElement(event, editedTaskElement);
    if (taskStatus.startsWith("finished")) {
        index.$(index.DOMElems.taskStatusId + taskID).checked = true;
        getTask(taskID).classList.add(index.DOMElems.finishedTaskClass);
    }
    index.addActionListeners(taskID);
    editTaskInLS(taskID, newTitle);
}

function editTaskInLS(taskID, newTitle) {
    let taskInfo = JSON.parse(localStorage.getItem(taskID));
    taskInfo.title = newTitle;
    localStorage.setItem(taskID, JSON.stringify(taskInfo));
}

export function getTask(taskID) {
    return index.$(index.DOMElems.taskTitleId + taskID);
}
