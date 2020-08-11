
let id = 0;
let allItems = [];

function SingleTask(id, title) {
    this.id = id;
    this.title = title;
}

function handleAddTask() {
    console.log(document.getElementById("newTask").value);
    var test = document.createElement("p");
    var test1 = document.createTextNode(document.getElementById("newTask").value);
    test.appendChild(test1);
    var theDiv = document.getElementById("allTasks");
    theDiv.appendChild(test);
}