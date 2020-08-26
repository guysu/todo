import axios from "axios";

const serverPrefix = "/todos";

export async function getAllTodosFromServer() {
    return (await fetch(serverPrefix)).json();
}

export async function addNewTaskToServer(textInput) {
    return await axios.post(serverPrefix, {
        title: textInput,
        checked: false,
    });
}

export function checkTaskInServer(taskID, status) {
    axios.put(getLocalAddress(taskID), { checked: status });
}

export function editTaskTitleInServer(taskID, newTitle) {
    axios.put(getLocalAddress(taskID), { title: newTitle });
}

export function deleteTaskFromServer(taskID) {
    fetch(getLocalAddress(taskID), { method: "DELETE" });
}

function getLocalAddress(taskID) {
    return `${serverPrefix}/${taskID}`;
}
