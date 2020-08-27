import axios from "axios";

const serverPrefix = "/todos";

export async function getAllTodosFromServer() {
    const res = await fetch(serverPrefix);
    if (res.ok) {
        return res.json();
    } else {
        throw "Server Error";
    }
}

export async function addNewTaskToServer(textInput) {
    return await axios.post(serverPrefix, {
        title: textInput,
        checked: false,
    });
}

export async function checkTaskInServer(taskID, status) {
    await axios.put(getAddress(taskID), { checked: status });
}

export async function editTaskTitleInServer(taskID, newTitle) {
    await axios.put(getAddress(taskID), { title: newTitle });
}

export function deleteTaskFromServer(taskID) {
    const res = fetch(getAddress(taskID), { method: "DELETE" });
    if (!res.ok) {
        throw "Server Error";
    }
}

function getAddress(taskID) {
    return `${serverPrefix}/${taskID}`;
}
