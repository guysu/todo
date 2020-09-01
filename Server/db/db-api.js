const client = require("redis").createClient(process.env.REDIS_URL);
client.on("connect", function () {
    console.log("Successfully connected");
});
const { promisify } = require("util");

const hmgetAsync = promisify(client.hmget).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

const setTask = (userID, taskToSet) => {
    client.hmset(userID, taskToSet.id, JSON.stringify(taskToSet));
};

const getAllUserTodos = async (userID) => {
    let allTodos = await hgetallAsync(userID);
    if (allTodos) {
        return Object.values(allTodos).map((el) => JSON.parse(el));
    } else {
        return [];
    }
};

const getSingleTodo = async (userID, taskID) => {
    const userTodos = await hmgetAsync(userID, taskID);
    return JSON.parse(userTodos);
};

const deleteSingleTodo = async (userID, taskID) => {
    client.hdel(userID, taskID);
};

module.exports = {
    setTask,
    getAllUserTodos,
    getSingleTodo,
    deleteSingleTodo,
};
