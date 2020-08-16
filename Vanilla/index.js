const $ = document.querySelector;

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
  allUnfinishedTasksClass: ".unfinished-tasks",
  allFinishedTasksClass: ".finished-tasks",
};

function generateGUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function addOnClickHandler(DOMelement, func) {
  $(DOMelement).addEventListener("click", func);
}

addOnClickHandler(DOMElems.addTaskButtonClass, function () {
  let html = DOMhtml.newTask.replace(/%id%/g, generateGUID());
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
    handleDelete(event);
  } else if (eventID.startsWith("task-status")) {
    handleFinished(event);
  } else if (eventID.startsWith("edit-btn")) {
    handleEdit(event);
  } else if (eventID.startsWith("save")) {
    handleSave(event);
  }
});

function handleSave(event) {
  const taskID = event.target.id.split("_")[1];
  let html = DOMhtml.newTask.replace(/%id%/g, taskID);
  const taskStatus = event.target.parentNode.parentNode.classList[0];
  const newTitle = $(DOMElems.editInputId + taskID).value;
  html = html.replace("%title%", newTitle);
  const editedTaskElement = createHTMLElement(html);
  replaceTaskElement(event, editedTaskElement);
  if (taskStatus.startsWith("finished")) {
    $(DOMElems.taskStatusId + taskID).checked = true;
    getTask(taskID).classList.add(DOMElems.finishedTaskClass);
  }
}

function getTask(taskID) {
  return $(DOMElems.taskTitleId + taskID);
}

function handleEdit(event) {
  const taskID = event.target.id.split("_")[1];
  const editElementHtml = DOMhtml.editElement.replace(/%id%/g, taskID);
  const newElement = createHTMLElement(editElementHtml);
  const existingTitle = getTask(taskID).textContent;
  replaceTaskElement(event, newElement);
  let inputField = $(DOMElems.editInputId + taskID);
  inputField.value = existingTitle;
  inputField.focus();
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

function handleFinished(event) {
  const eventID = event.target.id;
  const taskTitleID = eventID.split("_")[1];
  $("#" + eventID).checked
    ? appendToFinished(event)
    : appendToUnfinished(event);
  getTask(taskTitleID).classList.toggle(DOMElems.finishedTaskClass);
}

function appendToUnfinished(event) {
  $(DOMElems.allUnfinishedTasksClass).appendChild(event.target.parentNode);
}

function appendToFinished(event) {
  $(DOMElems.allFinishedTasksClass).appendChild(event.target.parentNode);
}

function handleDelete(event) {
  const parentID = event.target.parentNode.id;
  $("#" + parentID).remove();
}
