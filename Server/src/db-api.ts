import { Todo } from "../../common/types";
const client = require("redis").createClient(process.env.REDIS_URL);
client.on("connect", function () {
    console.log("Successfully connected");
});
import { promisify } from "util";

const hmgetAsync = promisify(client.hmget).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

export const setTask = (userID: string, taskToSet: Todo) => {
    client.hmset(userID, taskToSet.id, JSON.stringify(taskToSet));
};

export const getAllUserTodos = async (userID: string) => {
    let allTodos: string[] = await hgetallAsync(userID);
    return allTodos ? Object.values(allTodos).map((el) => JSON.parse(el)) : [];
};

export const getSingleTodo = async (userID: string, taskID: string) => {
    const userTodos = await hmgetAsync(userID, taskID);
    return JSON.parse(userTodos);
};

export const deleteSingleTodo = async (userID: string, taskID: string) => {
    client.hdel(userID, taskID);
};
