const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const ctrl = require("./server.ctrl");

const PORT = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

app.get("/todos", async (req, res) => {
    const { userID, allTodos } = await ctrl.getAllUserTodos(req);
    res.cookie("userID", userID, { httpOnly: true });
    res.send(allTodos);
});

app.post("/todos", (req, res) => {
    res.send(ctrl.createNewTodo(req));
});

app.delete("/todos/:id", (req, res) => {
    ctrl.deleteTodo(req);
    res.sendStatus(200);
});

app.put("/todos/:id", async (req, res) => {
    if (await ctrl.editTodo(req)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
