const uuid = require("uuid");
import {DAO} from './index';
import { Todo, NewTodo } from "../../common/types";

export const getAllUserTodos = async (userID: string) => {
    const allTodos = await DAO.getAllUserTodos(userID);
    return allTodos.sort((a: Todo, b: Todo) => (a.checked > b.checked ? 1 : -1));
};

export const createNewTodo = (userID: string, taskToAdd: NewTodo): Todo => {
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...taskToAdd };
    DAO.setTask(userID, newTask);
    return newTask;
};

export const deleteTodo = (userID: string, taskID: string) => {
    DAO.deleteSingleTodo(userID, taskID);
};

export const editTodo = async (
    userID: string,
    taskID: string,
    checked: boolean | undefined,
    title: string | undefined
) => {
    let editVal;
    const taskToEdit = await DAO.getSingleTodo(userID, taskID);
    if (typeof checked === "undefined") {
        if (typeof title === "undefined") {
            return false;
        } else {
            editVal = { title: title };
        }
    } else {
        editVal = { checked: checked };
    }
    DAO.setTask(userID, { ...taskToEdit, ...editVal });
    return true;
};
