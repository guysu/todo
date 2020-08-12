
let id = 0;
let allItems = [];

function SingleTask(id, title) {
    this.id = id;
    this.title = title;
}



document.querySelector('.add_task_btn').addEventListener('click', function() {
    let html = '<div class="single_task" id="task_%id%"><input type="checkbox" id="task_status_%id%"/> <span class="task_title_%id%">%title%</span> \
    <button class="edit_btn" id="edit_%id%">Edit</button> <button class="delete_btn" id="delete_%id%">Delete</button></div>'
    html = html.replace(/%id%/g, id);
    document.querySelector('.unfinished_tasks').insertAdjacentHTML('beforeend', html);
    id++;
})


document.querySelector('.tasks_container').addEventListener('click', function(event) {
    let eventID = event.target.id;
    // For deleting task
    if (eventID.startsWith('delete')) {
        handleDelete(event);
    }
    // For checking finished or unfinished task
    else if (eventID.startsWith('task_status')) {
        handleFinished(event); 
    }
})


function handleFinished(event) {
    let eventID = event.target.id;
    let taskTitleID = eventID.split('_')[2];

    if (document.querySelector('#' + eventID).checked) { //Moves task to bottom of finished
        document.querySelector('.finished_tasks').appendChild(event.target.parentNode);
    }
    else {
        document.querySelector('.unfinished_tasks').appendChild(event.target.parentNode);
    }

    document.querySelector('.task_title_' + taskTitleID).classList.toggle('finished_task'); //Adds line through if finished
}

function handleDelete(event) {
    let parentID = event.target.parentNode.id;
    document.querySelector('#' + parentID).remove();
}

