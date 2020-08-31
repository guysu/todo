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
        DAO.setValue(userID, []);
        res.cookie("userID", userID, { httpOnly: true });
    }
    res.send(await DAO.getUserTodos(userID));
});

app.post("/todos", async (req, res) => {
    let userID = getUserID(req);
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...req.body };
    let allTodosFromUser = await DAO.getUserTodos(userID);
    allTodosFromUser.push(newTask);
    DAO.setValue(userID, allTodosFromUser);
    res.send(newTask);
});

app.delete("/todos/:id", async (req, res) => {
    const userID = getUserID(req);
    const taskID = req.params.id;
    const allTodosFromUser = await DAO.getUserTodos(userID);
    DAO.setValue(
        userID,
        allTodosFromUser.filter((el) => el.id !== taskID)
    );
    res.sendStatus(200);
});

app.put("/todos/:id", async (req, res) => {
    let userID = getUserID(req);
    const taskID = req.params.id;
    let allTodosFromUser = await DAO.getUserTodos(userID);
    const taskIdx = allTodosFromUser.findIndex((el) => el.id === taskID);
    allTodosFromUser[taskIdx] = {
        ...allTodosFromUser[taskIdx],
        ...req.body,
    };
    DAO.setValue(userID, allTodosFromUser);
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
