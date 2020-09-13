import axios from "axios";
import { Todo, NewTodo } from "../../../common/types";

const serverPrefix = "/todos";

const getAddress = (taskID: string) => {
    return `${serverPrefix}/${taskID}`;
};

export const getAllTodosFromServer = async (): Promise<Todo[]> => {
    try {
        const res = await axios.get(serverPrefix);
        return res.data;
    } catch {
        throw "Unable to receive data";
    }
};

export const addNewTaskToServer = async (textInput: string): Promise<Todo> => {
    const newTodo: NewTodo = { title: textInput, checked: false };
    return (await axios.post(serverPrefix, newTodo)).data;
};

export const deleteTaskFromServer = async (taskID: string): Promise<void> => {
    return axios.delete(getAddress(taskID));
};

export const checkTaskInServer = async (
    taskID: string,
    status: boolean
): Promise<void> => {
    if ((await axios.put(getAddress(taskID), { checked: status })).status === 400) {
        throw "Unable to check";
    }
};

export const editTaskTitleInServer = async (
    taskID: string,
    newTitle: string
): Promise<void> => {
    if ((await axios.put(getAddress(taskID), { title: newTitle })).status === 400) {
        throw "Unable to edit";
    }
};
