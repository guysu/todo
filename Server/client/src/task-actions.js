import { $ } from "./utils";
import * as utils from "./utils";
import { appDOMElems } from "./app.ctrl";
import {
    checkTaskInServer,
    editTaskTitleInServer,
    deleteTaskFromServer,
} from "./server-api";

export const actionDOMElems = {
    editInputId: "#edit-input_",
    taskStatusId: "#task-status_",
    taskTitleId: "#task-title_",
    finishedTaskClassStyle: "finished-task",
    deleteBtn: "#delete_",
    editBtn: "#edit-btn_",
    saveBtn: "#save_",
};

const editHtml =
    '<div class="edit-task" id="edit-task_%id%"> <input type="text" class="edit-input" id="edit-input_%id%"/>\
<button class="save-btn" id="save_%id%">Save Changes</button></div>';

export const newTask =
    '<div class="single-task" id="task_%id%"><input type="checkbox" class="checkbox" id="task-status_%id%"/> <span class="task-title" \
                id="task-title_%id%">%title%</span> \
                <button class="edit-btn" id="edit-btn_%id%">Edit</button> <button class="delete-btn" id="delete_%id%">Delete</button></div>';

function handleDelete(event) {
    try {
        deleteTaskFromServer(taskID);
        const parentID = event.target.parentNode.id;
        $("#" + parentID).remove();
        const taskID = extractID(event);
    } catch {
        alert("Could not delete data from server, please try again");
    }
}

async function handleCheck(event) {
    const eventID = event.target.id;
    const taskTitleID = extractID(event);
    const currStatus = $("#" + eventID).checked;
    try {
        await checkTaskInServer(taskTitleID, currStatus);
        currStatus ? appendToFinished(event) : appendToUnfinished(event);
        getTask(taskTitleID).classList.toggle(
            actionDOMElems.finishedTaskClassStyle
        );
    } catch {
        alert("Could not check this task, please try again");
    }
}

function appendToUnfinished(event) {
    $(appDOMElems.unfinishedTasksClass).appendChild(event.target.parentNode);
}

function appendToFinished(event) {
    $(appDOMElems.allFinishedTasksClass).prepend(event.target.parentNode);
}

function handleEdit(event) {
    const taskID = extractID(event);
    const editElementHtml = editHtml.replace(/%id%/g, taskID);
    const newElement = createHTMLElement(editElementHtml);
    const existingTitle = getTask(taskID).textContent;
    replaceTaskElement(event, newElement);
    const saveBtnID = actionDOMElems.saveBtn + taskID;
    utils.addOnClickHandler(saveBtnID, handleSave);
    let inputField = $(actionDOMElems.editInputId + taskID);
    inputField.value = existingTitle;
    inputField.focus();
}

function extractID(event) {
    return event.target.id.split("_")[1];
}

function replaceTaskElement(event, newElement) {
    const oldElement = $("#" + event.target.parentNode.id);
    const parentClass = event.target.parentNode.parentNode.classList[0];
    $("." + parentClass).replaceChild(newElement, oldElement);
}

function createHTMLElement(htmlString) {
    var div = document.createElement("DIV");
    div.innerHTML = htmlString;
    return div.firstChild;
}

async function handleSave(event) {
    const taskID = extractID(event);
    let html = newTask.replace(/%id%/g, taskID);
    const taskStatus = event.target.parentNode.parentNode.classList[0];
    const newTitle = $(actionDOMElems.editInputId + taskID).value;
    html = html.replace("%title%", newTitle);
    const editedTaskElement = createHTMLElement(html);
    try {
        await editTaskTitleInServer(taskID, newTitle);
        replaceTaskElement(event, editedTaskElement);
        if (taskStatus.startsWith("finished")) {
            $(actionDOMElems.taskStatusId + taskID).checked = true;
            getTask(taskID).classList.add(
                actionDOMElems.finishedTaskClassStyle
            );
        }
        addActionListeners(taskID);
    } catch {
        alert("Could not edit this task, please try again");
    }
}

export function addActionListeners(id) {
    const deleteBtnID = actionDOMElems.deleteBtn + id;
    utils.addOnClickHandler(deleteBtnID, handleDelete);
    const taskCheckboxID = actionDOMElems.taskStatusId + id;
    utils.addOnClickHandler(taskCheckboxID, handleCheck);
    const editBtnID = actionDOMElems.editBtn + id;
    utils.addOnClickHandler(editBtnID, handleEdit);
}

function getTask(taskID) {
    return $(actionDOMElems.taskTitleId + taskID);
}
