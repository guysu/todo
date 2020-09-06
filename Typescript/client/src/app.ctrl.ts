import * as utils from "./utils";
import { $ } from "./utils";
import * as taskActions from "./task-actions";
import { actionDOMElems } from "./task-actions";
import { addNewTaskToServer } from "./server-api";

export const appDOMElems = {
    addTaskButtonClass: ".add-task-btn",
    addTaskInputClass: ".add-task-input",
    unfinishedTasksClass: ".unfinished-tasks",
    allFinishedTasksClass: ".finished-tasks",
};

const addUnfinishedTask = (html: string) => {
    $(appDOMElems.unfinishedTasksClass)!.insertAdjacentHTML("beforeend", html);
};

const addFinishedTask = (html: string, id: string) => {
    $(appDOMElems.allFinishedTasksClass)!.insertAdjacentHTML("beforeend", html);
    $(actionDOMElems.taskTitleId + id)!.classList.add(
        actionDOMElems.finishedTaskClassStyle
    );
    const checkboxElement = <HTMLInputElement>$(actionDOMElems.taskStatusId + id);
    checkboxElement.checked = true;
};

export const addTaskToDOM = (taskID: string, textInput: string, checked: boolean) => {
    let html = taskActions.newTask.replace(/%id%/g, taskID);
    html = html.replace("%title%", textInput);
    checked ? addFinishedTask(html, taskID) : addUnfinishedTask(html);
    taskActions.addActionListeners(taskID);
};

export const callNewTaskHandler = () => {
    utils.addOnClickHandler(appDOMElems.addTaskButtonClass, async function () {
        const inputDOM = <HTMLInputElement>$(appDOMElems.addTaskInputClass);
        const textInput = inputDOM.value;
        if (textInput) {
            try {
                const res = await addNewTaskToServer(textInput);
                const { id, title, checked } = res.data;
                addTaskToDOM(id, title, checked);
                inputDOM.value = "";
            } catch {
                alert("Could not add task to server, please try again");
            }
        }
    });
};
