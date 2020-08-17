import * as taskActions from "./task-actions";
import * as utils from "./utils";
import "./style.css";

export const $ = document.querySelector.bind(document);

export const DOMhtml = {
    newTask:
        '<div class="single-task" id="task_%id%"><input type="checkbox" class="checkbox" id="task-status_%id%"/> <span class="task-title" \
                id="task-title_%id%">%title%</span> \
                <button class="edit-btn" id="edit-btn_%id%">Edit</button> <button class="delete-btn" id="delete_%id%">Delete</button></div>',
    editElement:
        '<div class="edit-task" id="edit-task_%id%"> <input type="text" class="edit-input" id="edit-input_%id%"/>\
                <button class="save-btn" id="save_%id%">Save Changes</button></div>',
};

export const DOMElems = {
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

export function addOnClickHandler(DOMelement, func) {
    $(DOMelement).addEventListener("click", func);
}

addOnClickHandler(DOMElems.addTaskButtonClass, function () {
    const taskID = utils.generateGUID();
    let html = DOMhtml.newTask.replace(/%id%/g, taskID);
    const inputDOM = $(DOMElems.addTaskInputClass);
    const textInput = inputDOM.value;
    if (textInput) {
        html = html.replace("%title%", textInput);
        inputDOM.value = "";
        $(DOMElems.unfinishedTasksClass).insertAdjacentHTML("beforeend", html);
        addActionListeners(taskID);
    }
});

export function addActionListeners(id) {
    const deleteBtnID = DOMElems.deleteBtn + id;
    addOnClickHandler(deleteBtnID, taskActions.handleDelete);
    const taskCheckboxID = DOMElems.taskStatusId + id;
    addOnClickHandler(taskCheckboxID, taskActions.handleCheck);
    const editBtnID = DOMElems.editBtn + id;
    addOnClickHandler(editBtnID, taskActions.handleEdit);
}
