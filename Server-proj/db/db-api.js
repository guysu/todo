const client = require("redis").createClient(process.env.REDIS_URL);
client.on("connect", function () {
    console.log("Successfully connected");
});
const { promisify } = require("util");

/* const hgetallAsync = (userId) => {
    return new Promise((res, rej) => {
        client.hgetall(userId, (err, obj) => (err ? rej(err) : res(obj)));
    });
}; */

/* const promisify = (func) => {
    return (...args) => {
        return new Promise((res, rej) => {
            console.log(func);
            func.apply(
                this,
                args.concat((err, obj) => (err ? rej(err) : res(obj)))
            );
        });
    };
}; */

// const hgetallAsync = (userId) => new Promise((res, rej) => client.hgetall(userId, (err, obj) => err ? rej(err) : res(obj))

// const waitFor = ms => new Promise((res, rej) => setTimeout(res, ms))

/* const waitFor = (ms) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, ms);
    });
}; */

const hmgetAsync = promisify(client.hmget).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

const setTask = (userID, taskToSet) => {
    client.hmset(userID, taskToSet.id, JSON.stringify(taskToSet));
};

const getAllUserTodos = async (userID) => {
    let allTodos = await hgetallAsync(userID);
    return allTodos ? Object.values(allTodos).map((el) => JSON.parse(el)) : [];
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
