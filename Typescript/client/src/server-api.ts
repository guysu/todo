import axios from "axios";
import { Todo, NewTodo } from "../../common/types";

const serverPrefix = "/todos";

const getAddress = (taskID: string) => {
    return `${serverPrefix}/${taskID}`;
}

export const getAllTodosFromServer = async () =>  {
    try {
        const res = await axios.get(serverPrefix);
        return res.data;
    } catch {
        throw "Server Error";
    }
};

export const addNewTaskToServer = async (textInput: string) => {
	const newTodo: NewTodo = {title: textInput, checked: false};
	return await axios.post(serverPrefix, newTodo);
}

export const deleteTaskFromServer = async (taskID: string) => {
	try {
		await axios.delete(getAddress(taskID))
	}
	catch {
		throw "Server Error"
	}
} 

export const checkTaskInServer = async (taskID: string, status: boolean) => {
	await axios.put(getAddress(taskID), { checked: status });
}

export const editTaskTitleInServer = async (taskID: string, newTitle: string) => {
	await axios.put(getAddress(taskID), { title: newTitle });
}
