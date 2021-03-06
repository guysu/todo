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
    } catch (e) {
        throw e;
    }
};

export const addNewTaskToServer = async (textInput: string): Promise<Todo> => {
    const newTodo: NewTodo = { title: textInput, checked: false };
    return (await axios.post(serverPrefix, newTodo)).data;
};

export const deleteTaskFromServer = async (taskID: string): Promise<void> => {
    return await axios.delete(getAddress(taskID));
};

export const checkTaskInServer = async (
    taskID: string,
    status: boolean
): Promise<void> => {
    return await axios.put(getAddress(taskID), { checked: status });
};

export const editTaskTitleInServer = async (
    taskID: string,
    newTitle: string
): Promise<void> => {
    return await axios.put(getAddress(taskID), { title: newTitle });
};
