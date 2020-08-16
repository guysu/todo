const $ = document.querySelector.bind(document);

const DOMhtml = {
  newTask:
    '<div class="single-task" id="task_%id%"><input type="checkbox" class="checkbox" id="task-status_%id%"/> <span class="task-title" \
                id="task-title_%id%">%title%</span> \
                <button class="edit-btn" id="edit-btn_%id%">Edit</button> <button class="delete-btn" id="delete_%id%">Delete</button></div>',
  editElement:
    '<div class="edit-task" id="edit-task_%id%"> <input type="text" class="edit-input" id="edit-input_%id%"/>\
                <button class="save-btn" id="save_%id%">Save Changes</button></div>',
};

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
};

function addOnClickHandler(DOMelement, func) {
  $(DOMelement).addEventListener("click", func);
}

addOnClickHandler(DOMElems.addTaskButtonClass, function () {
  let html = DOMhtml.newTask.replace(/%id%/g, utils.generateGUID());
  const inputDOM = $(DOMElems.addTaskInputClass);
  const textInput = inputDOM.value;
  if (textInput) {
    html = html.replace("%title%", textInput);
    inputDOM.value = "";
    $(DOMElems.unfinishedTasksClass).insertAdjacentHTML("beforeend", html);
  }
});

addOnClickHandler(DOMElems.tasksContainerClass, function (event) {
  const eventID = event.target.id;

  if (eventID.startsWith("delete")) {
    taskActions.handleDelete(event);
  } else if (eventID.startsWith("task-status")) {
    taskActions.handleCheck(event);
  } else if (eventID.startsWith("edit-btn")) {
    taskActions.handleEdit(event);
  } else if (eventID.startsWith("save")) {
    taskActions.handleSave(event);
  }
});
