const client = require("redis").createClient(process.env.REDIS_URL);
client.on("connect", function () {
    console.log("Successfully connected");
});
const { promisify } = require("util");

const hmgetAsync = promisify(client.hmget).bind(client);

const setValue = (userID, objToSet) => {
    client.hmset(userID, "todos", JSON.stringify(objToSet));
};

const getUserTodos = async (userID) => {
    const userTodos = await hmgetAsync(userID, "todos");
    return JSON.parse(userTodos);
};

module.exports = {
    setValue: setValue,
    getUserTodos: getUserTodos,
};
