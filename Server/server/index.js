const express = require("express");
const path = require("path");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

const getUserID = (req) => req.cookies.id;
let todos = new Map();

app.get("/todos", (req, res) => {
    let userID = getUserID(req);
    if (!userID) {
        userID = uuid.v4();
        todos.set(userID, []);
        res.cookie("id", userID, { httpOnly: true });
    }
    res.send(todos.get(userID));
});

app.post("/todos", (req, res) => {
    let userID = getUserID(req);
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...req.body };
    todos.get(userID).push(newTask);
    res.send(newTask);
});

app.delete("/todos/:id", (req, res) => {
    let userID = getUserID(req);
    const taskID = req.params.id;
    const taskIdx = todos.get(userID).findIndex((el) => el.id === taskID);
    todos.get(userID).splice(taskIdx, 1);
    res.sendStatus(200);
});

app.put("/todos/:id", (req, res) => {
    let userID = getUserID(req);
    const taskID = req.params.id;
    let taskIdx = todos.get(userID).findIndex((el) => el.id === taskID);
    todos.get(userID)[taskIdx] = { ...todos.get(userID)[taskIdx], ...req.body };
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
