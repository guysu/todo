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

const extractID = (event: Event) => {
    const buttonElem = <HTMLButtonElement>event.target!;
    return buttonElem.id.split("_")[1];
};

const getTask = (taskID: string) => {
    return $(actionDOMElems.taskTitleId + taskID)!;
};

const createHTMLElement = (htmlString: string) => {
    var div = document.createElement("DIV");
    div.innerHTML = htmlString;
    return div.firstChild!;
};

const replaceTaskElement = (event: Event, newElement: ChildNode) => {
    const buttonElem = <HTMLButtonElement>event.target!;
    const taskElem = <HTMLElement>buttonElem.parentNode;
    const containerElem = <HTMLElement>taskElem.parentNode;
    const existingElement = $("#" + taskElem.id)!;
    const containerClass = containerElem.classList[0];
    $("." + containerClass)!.replaceChild(newElement, existingElement);
};

const appendToUnfinished = (event: Event) => {
    const newTask = <Node>(event.target! as HTMLElement).parentNode;
    $(appDOMElems.unfinishedTasksClass)!.appendChild(newTask);
};

const appendToFinished = (event: Event) => {
    const newTask = <Node>(event.target! as HTMLElement).parentNode;
    $(appDOMElems.allFinishedTasksClass)!.prepend(newTask);
};

const handleDelete = (event: Event) => {
    try {
        const taskID = extractID(event);
        deleteTaskFromServer(taskID);
        const buttonElem = <HTMLButtonElement>event.target!;
        const taskElem = <HTMLElement>buttonElem.parentNode;
        $("#" + taskElem.id)!.remove();
    } catch {
        alert("Could not delete data from server, please try again");
    }
};

const handleCheck = async (event: Event) => {
    const eventID = (event.target as HTMLButtonElement).id;
    const taskTitleID = extractID(event);
    const currStatus = ($("#" + eventID)! as HTMLInputElement).checked;
    try {
        await checkTaskInServer(taskTitleID, currStatus);
        currStatus ? appendToFinished(event) : appendToUnfinished(event);
        getTask(taskTitleID).classList.toggle(actionDOMElems.finishedTaskClassStyle);
    } catch {
        alert("Could not check this task, please try again");
    }
};

const handleSave = async (event: Event) => {
    const taskID = extractID(event);
    let html = newTask.replace(/%id%/g, taskID);
    const taskElem = <Node>(event.target as HTMLElement).parentNode;
    const containerElem = <Element>taskElem.parentNode;
    const taskStatus = containerElem.classList[0];
    const newTitle = ($(actionDOMElems.editInputId + taskID) as HTMLInputElement).value;
    html = html.replace("%title%", newTitle);
    const editedTaskElement = createHTMLElement(html);
    try {
        await editTaskTitleInServer(taskID, newTitle);
        replaceTaskElement(event, editedTaskElement);
        if (taskStatus.startsWith("finished")) {
            ($(actionDOMElems.taskStatusId + taskID) as HTMLInputElement).checked = true;
            getTask(taskID).classList.add(actionDOMElems.finishedTaskClassStyle);
        }
        addActionListeners(taskID);
    } catch {
        alert("Could not edit this task, please try again");
    }
};

const handleEdit = (event: Event) => {
    const taskID = extractID(event);
    const editElementHtml = editHtml.replace(/%id%/g, taskID);
    const newElement = createHTMLElement(editElementHtml);
    const existingTitle = getTask(taskID).textContent!;
    replaceTaskElement(event, newElement);
    const saveBtnID = actionDOMElems.saveBtn + taskID;
    utils.addOnClickHandler(saveBtnID, handleSave);
    let inputField = <HTMLInputElement>$(actionDOMElems.editInputId + taskID)!;
    inputField.value = existingTitle;
    inputField.focus();
};

export const addActionListeners = (id: string) => {
    const deleteBtnID = actionDOMElems.deleteBtn + id;
    utils.addOnClickHandler(deleteBtnID, handleDelete);
    const taskCheckboxID = actionDOMElems.taskStatusId + id;
    utils.addOnClickHandler(taskCheckboxID, handleCheck);
    const editBtnID = actionDOMElems.editBtn + id;
    utils.addOnClickHandler(editBtnID, handleEdit);
};
