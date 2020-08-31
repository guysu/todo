const express = require("express");
const path = require("path");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const app = express();
const client = require("redis").createClient(process.env.REDIS_URL);
client.on("connect", function () {
    console.log("Successfully connected");
});

const PORT = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/../client/public/")));
app.use(express.json());

const getUserID = (req) => req.cookies.id;

app.get("/todos", (req, res) => {
    let userID = getUserID(req);
    if (!userID) {
        userID = uuid.v4();
        const emptyArray = JSON.stringify([]);
        client.hmset(userID, "todos", emptyArray);
        res.cookie("userID", userID, { httpOnly: true });
    }
    client.hmget(userID, "todos", (err, obj) => {
        res.send(JSON.parse(obj));
    });
});

app.post("/todos", (req, res) => {
    let userID = getUserID(req);
    const taskID = uuid.v4();
    const newTask = { id: taskID, ...req.body };
    client.hmget(userID, "todos", (err, obj) => {
        const newArray = JSON.parse(obj);
        newArray.push(newTask);
        client.hmset(userID, "todos", JSON.stringify(newArray));
    });
    res.send(newTask);
});

app.delete("/todos/:id", (req, res) => {
    const userID = getUserID(req);
    const taskID = req.params.id;
    client.hmget(userID, "todos", (err, obj) => {
        const oldTodos = JSON.parse(obj);
        client.hmset(
            userID,
            "todos",
            JSON.stringify(oldTodos.filter((el) => el.id !== taskID))
        );
    });
    res.sendStatus(200);
});

app.put("/todos/:id", (req, res) => {
    let userID = getUserID(req);
    const taskID = req.params.id;
    client.hmget(userID, "todos", (err, obj) => {
        let allTodosFromUser = JSON.parse(obj);
        const taskIdx = allTodosFromUser.findIndex((el) => el.id === taskID);
        allTodosFromUser[taskIdx] = {
            ...allTodosFromUser[taskIdx],
            ...req.body,
        };
        client.hmset(userID, "todos", JSON.stringify(allTodosFromUser));
    });
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
