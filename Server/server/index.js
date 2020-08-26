const express = require("express");
const path = require("path");
const uuid = require("uuid");
const app = express();

const PORT = 80;

app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
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
    const taskToEdit = todos.find((el) => el.id === id);
    const { title, checked } = req.body;
    if (title) {
        taskToEdit.title = title;
    } else {
        taskToEdit.checked = checked;
    }
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
