import express = require("express");
import path = require("path");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
import * as ctrl from "./server.ctrl";
import { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

const getUserID = (req: Request) => req.cookies.userID;

app.get("/todos", async (req: Request, res: Response) => {
    const userID = getUserID(req) || uuid.v4();
    const allTodos = await ctrl.getAllUserTodos(userID);
    res.cookie("userID", userID, { httpOnly: true });
    res.send(allTodos);
});

app.post("/todos", (req: Request, res: Response) => {
    const userID = getUserID(req);
    const newTask = req.body;
    res.send(ctrl.createNewTodo(userID, newTask));
});

app.delete("/todos/:id", (req: Request, res: Response) => {
    const userID = getUserID(req);
    const taskID = req.params.id;
    ctrl.deleteTodo(userID, taskID);
    res.sendStatus(200);
});

app.put("/todos/:id", async (req: Request, res: Response) => {
    const userID = getUserID(req);
    const taskID = req.params.id;
    const { checked, title } = req.body;
    if (await ctrl.editTodo(userID, taskID, checked, title)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
