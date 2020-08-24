import axios from "axios";
import * as utils from "./utils";
import { $ } from "./utils";
import * as taskActions from "./task-actions";
import { actionDOMElems } from "./task-actions";

export const appDOMElems = {
    addTaskButtonClass: ".add-task-btn",
    addTaskInputClass: ".add-task-input",
    unfinishedTasksClass: ".unfinished-tasks",
    allFinishedTasksClass: ".finished-tasks",
};

export function callNewTaskHandler() {
    utils.addOnClickHandler(appDOMElems.addTaskButtonClass, function () {
        const inputDOM = $(appDOMElems.addTaskInputClass);
        const textInput = inputDOM.value;
        if (textInput) {
            const taskID = utils.generateGUID();
            addTaskToDOM(taskID, textInput, false);
            inputDOM.value = "";
            addNewTaskToServer(textInput, taskID);
        }
    });
}

function addNewTaskToServer(textInput, taskID) {
    axios.post(utils.serverAddress, {
        id: taskID,
        title: textInput,
        checked: false,
    });
}

export function addTaskToDOM(taskID, textInput, checked) {
    let html = taskActions.newTask.replace(/%id%/g, taskID);
    html = html.replace("%title%", textInput);
    checked ? addFinishedTask(html, taskID) : addUnfinishedTask(html);
    taskActions.addActionListeners(taskID);
}

function addUnfinishedTask(html) {
    $(appDOMElems.unfinishedTasksClass).insertAdjacentHTML("beforeend", html);
}

function addFinishedTask(html, id) {
    $(appDOMElems.allFinishedTasksClass).insertAdjacentHTML("beforeend", html);
    $(actionDOMElems.taskTitleId + id).classList.add(
        actionDOMElems.finishedTaskClassStyle
    );
    $(actionDOMElems.taskStatusId + id).checked = true;
}
