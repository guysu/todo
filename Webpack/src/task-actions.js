import * as index from "./index";

export function handleDelete(event) {
    const parentID = event.target.parentNode.id;
    index.$("#" + parentID).remove();
}

export function handleCheck(event) {
    const eventID = event.target.id;
    const taskTitleID = eventID.split("_")[1];
    index.$("#" + eventID).checked
        ? appendToFinished(event)
        : appendToUnfinished(event);
    getTask(taskTitleID).classList.toggle(index.DOMElems.finishedTaskClass);
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
    const taskID = event.target.id.split("_")[1];
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
    const taskID = event.target.id.split("_")[1];
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
}

function getTask(taskID) {
    return index.$(index.DOMElems.taskTitleId + taskID);
}

/* export const taskActions = {
    handleEdit,
    handleDelete,
    handleCheck,
    handleSave,
}; */