import express = require("express");
import path = require("path");
import jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
import * as ctrl from "./server.ctrl";
import { Request, Response, NextFunction } from "express";
import { Todo, NewTodo, userAuthRequest } from "../common/types";

const app = express();
const PORT = process.env.PORT || 80;
const secret = "WowWhatASecret";

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

const getUserID = (req: Request): string => (req as userAuthRequest).userId;
const getAccessToken = (req: Request) => req.cookies.accessToken;

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    let accessToken = getAccessToken(req);
    if (!accessToken) {
        const userId = uuid.v4();
        accessToken = await jwt.sign({ userId }, secret);
        res.cookie("accessToken", accessToken, { httpOnly: true });
    }
    jwt.verify(accessToken, secret, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        (req as userAuthRequest).userId = user.userId;
    });
    next();
};

app.get("/todos", authenticateToken, async (req: Request, res: Response) => {
    const userID = getUserID(req);
    const allTodos: Todo[] = await ctrl.getAllUserTodos(userID);
    res.send(allTodos);
});

app.post("/todos", authenticateToken, (req: Request, res: Response) => {
    const userID = getUserID(req);
    console.log(userID);
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
