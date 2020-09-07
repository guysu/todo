import express = require("express");
import path = require("path");
const cookieParser = require("cookie-parser");
import * as ctrl from "./server.ctrl";
import { Request, Response } from "express";
import { Todo, NewTodo, userAuthRequest } from "../common/types";
import { authenticateToken, createToken } from "./identity";

const app = express();
const PORT = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

const getUserID = (req: Request): string => (req as userAuthRequest).userId;

app.get("/", async (req: Request, res: Response) => {
    await createToken(req, res);
    res.status(200).render(path.join(__dirname + "/../client/views/index.ejs"));
});

app.get("/todos", authenticateToken, async (req: Request, res: Response) => {
    const userID = getUserID(req);
    const allTodos: Todo[] = await ctrl.getAllUserTodos(userID);
    res.send(allTodos);
});

app.post("/todos", authenticateToken, (req: Request, res: Response) => {
    const userID = getUserID(req);
    const newTask: NewTodo = req.body;
    res.send(ctrl.createNewTodo(userID, newTask));
});

app.delete("/todos/:id", authenticateToken, (req: Request, res: Response) => {
    const userID = getUserID(req);
    const taskID = req.params.id;
    ctrl.deleteTodo(userID, taskID);
    res.sendStatus(200);
});

app.put("/todos/:id", authenticateToken, async (req: Request, res: Response) => {
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
