import * as appCtrl from "./app.ctrl";
import "./style.css";

export const DOMhtml = {};

const DOMElems = {
    addTaskButtonClass: ".add-task-btn",
    addTaskInputClass: ".add-task-input",
    unfinishedTasksClass: ".unfinished-tasks",
    tasksContainerClass: ".tasks-container",
    editInputId: "#edit-input_",
    taskStatusId: "#task-status_",
    taskTitleId: "#task-title_",
    finishedTaskClass: "finished-task",
    allFinishedTasksClass: ".finished-tasks",
    deleteBtn: "#delete_",
    editBtn: "#edit-btn_",
    saveBtn: "#save_",
};

(function init() {
    for (let i = 0; i < localStorage.length; i++) {
        const taskID = localStorage.key(i);
        const { title, checked } = JSON.parse(localStorage.getItem(taskID));
        appCtrl.addTaskToDOM(taskID, title, checked);
    }
})();
