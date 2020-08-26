const express = require("express");
const path = require("path");
const uuid = require("uuid");
const app = express();

const PORT = 80;

app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
    console.log(todos);
    res.send(todos);
});

app.post("/todos", (req, res) => {
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...req.body };
    todos.push(newTask);
    res.send(newTask);
});

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    const newTodos = todos.filter((el) => el.id !== id);
    todos = newTodos;
    res.sendStatus(200);
});

app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    let taskIdx = todos.findIndex((el) => el.id === id);
    todos[taskIdx] = { ...todos[taskIdx], ...req.body };
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
