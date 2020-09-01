const uuid = require("uuid");
const DAO = require("../db/db-api");

const getUserID = (req) => req.cookies.userID;

const getAllUserTodos = async (req) => {
    let userID = getUserID(req);
    if (!userID) {
        userID = uuid.v4();
    }
    const allTodos = await DAO.getAllUserTodos(userID);
    return { userID, allTodos };
};

const createNewTodo = (req) => {
    let userID = getUserID(req);
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...req.body };
    DAO.setTask(userID, newTask);
    return newTask;
};

const deleteTodo = (req) => {
    const userID = getUserID(req);
    const taskID = req.params.id;
    DAO.deleteSingleTodo(userID, taskID);
};

const editTodo = async (req) => {
    let editVal;
    let userID = getUserID(req);
    const taskID = req.params.id;
    let taskToEdit = await DAO.getSingleTodo(userID, taskID);
    if (typeof req.body.checked === "undefined") {
        if (typeof req.body.title === "undefined") {
            return false;
        } else {
            editVal = { title: req.body.title };
        }
    } else {
        editVal = { checked: req.body.checked };
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
