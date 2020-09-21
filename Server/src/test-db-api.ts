import { Todo } from "../../common/types";
import { DbAPI } from "./types";


const setTask = (userID: string, taskToSet: Todo) => {};

const getAllUserTodos = async (userID: string) => [];

const getSingleTodo = async (userID: string, taskID: string) => {
	return { id: "123", title: "Test", checked: false };
};

const deleteSingleTodo = async (userID: string, taskID: string) => {};

export const testDAO: DbAPI = {setTask, getAllUserTodos, getSingleTodo, deleteSingleTodo}

