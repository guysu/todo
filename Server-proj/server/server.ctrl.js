const uuid = require("uuid");
const DAO = require("../db/db-api");

const getAllUserTodos = async (userID) => {
    const allTodos = await DAO.getAllUserTodos(userID);
    return allTodos;
};

const createNewTodo = (userID, taskToAdd) => {
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...taskToAdd };
    DAO.setTask(userID, newTask);
    return newTask;
};

const deleteTodo = (userID, taskID) => {
    DAO.deleteSingleTodo(userID, taskID);
};

const editTodo = async (userID, taskID, checked, title) => {
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

module.exports = {
    getAllUserTodos,
    createNewTodo,
    deleteTodo,
    editTodo,
};
