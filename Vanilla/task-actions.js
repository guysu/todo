function handleDelete(event) {
  const parentID = event.target.parentNode.id;
  $("#" + parentID).remove();
}

function handleCheck(event) {
  const eventID = event.target.id;
  const taskTitleID = eventID.split("_")[1];
  $("#" + eventID).checked
    ? appendToFinished(event)
    : appendToUnfinished(event);
  getTask(taskTitleID).classList.toggle(DOMElems.finishedTaskClass);
}

function appendToUnfinished(event) {
  $(DOMElems.unfinishedTasksClass).appendChild(event.target.parentNode);
}

function appendToFinished(event) {
  $(DOMElems.allFinishedTasksClass).appendChild(event.target.parentNode);
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

const taskActions = {
  handleDelete,
  handleEdit,
  handleCheck,
  handleSave,
};
