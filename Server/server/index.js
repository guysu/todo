const express = require("express");
const path = require("path");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const { type } = require("os");
const app = express();
const client = require("redis").createClient(process.env.REDIS_URL);
client.on("connect", function () {
    console.log("Successfully connected");
});
// client.flushall();

const PORT = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

const getUserID = (req) => req.cookies.id;
let todos = new Map();

app.get("/todos", (req, res) => {
    /* let userID = getUserID(req);
    if (!userID) {
        userID = uuid.v4();
        todos.set(userID, []);
        res.cookie("id", userID, { httpOnly: true });
    }
    res.send(todos.get(userID)); */
    let userID = getUserID(req);
    if (!userID) {
        userID = uuid.v4();
        const emptyArray = JSON.stringify([]);
        client.hmset(userID, "todos", emptyArray);
        res.cookie("id", userID, { httpOnly: true });
    }
    client.hmget(userID, "todos", (err, obj) => {
        console.log(obj);
        res.send(JSON.parse(obj));
    });
});

app.post("/todos", (req, res) => {
    let userID = getUserID(req);
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...req.body };
    // todos.get(userID).push(newTask);
    client.hmget(userID, "todos", (err, obj) => {
        const newArray = JSON.parse(obj);
        newArray.push(newTask);
        client.hmset(userID, "todos", JSON.stringify(newArray));
    });
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
