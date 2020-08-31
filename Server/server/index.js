const express = require("express");
const path = require("path");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const app = express();
const DAO = require("../db/db-api");

const PORT = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

const getUserID = (req) => req.cookies.userID;

app.get("/todos", async (req, res) => {
    let userID = getUserID(req);
    if (!userID) {
        userID = uuid.v4();
        res.cookie("userID", userID, { httpOnly: true });
    }
    res.send(await DAO.getAllUserTodos(userID));
});

app.post("/todos", async (req, res) => {
    let userID = getUserID(req);
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...req.body };
    DAO.setTask(userID, newTask);
    res.send(newTask);
});

app.delete("/todos/:id", async (req, res) => {
    const userID = getUserID(req);
    const taskID = req.params.id;
    DAO.deleteSingleTodo(userID, taskID);
    res.sendStatus(200);
});

app.put("/todos/:id", async (req, res) => {
    let editVal;
    let userID = getUserID(req);
    const taskID = req.params.id;
    let taskToEdit = await DAO.getSingleTodo(userID, taskID);
    if (typeof req.body.checked === "undefined") {
        if (typeof req.body.title === "undefined") {
            res.sendStatus(400);
        } else {
            editVal = { title: req.body.title };
        }
    } else {
        editVal = { checked: req.body.checked };
    }
    DAO.setTask(userID, {...taskToEdit, ...editVal});
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
