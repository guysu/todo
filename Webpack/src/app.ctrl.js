import { $ } from "./utils";
import * as utils from "./utils";
import * as taskActions from "./task-actions";
import { actionDOMElems } from "./task-actions";

export const appDOMElems = {
    addTaskButtonClass: ".add-task-btn",
    addTaskInputClass: ".add-task-input",
    unfinishedTasksClass: ".unfinished-tasks",
    allFinishedTasksClass: ".finished-tasks",
};

utils.addOnClickHandler(appDOMElems.addTaskButtonClass, function () {
    const inputDOM = $(appDOMElems.addTaskInputClass);
    const textInput = inputDOM.value;
    if (textInput) {
        const taskID = utils.generateGUID();
        addTaskToDOM(taskID, textInput, false);
        inputDOM.value = "";
        addNewTaskToLS(textInput, taskID);
    }
});

function addNewTaskToLS(textInput, taskID) {
    const taskInfo = {
        title: textInput,
        checked: false,
    };
    localStorage.setItem(taskID, JSON.stringify(taskInfo));
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
