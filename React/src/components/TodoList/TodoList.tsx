import React, { useState, useEffect, ChangeEvent } from "react";
import TodoComponent from "../TodoComponent/TodoComponent";
import { Todo } from "../../../../common/types";
import InputBar from "../InputBar/InputBar";
import * as server from "../../services/server-api";

export const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputVal, setInputVal] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const allTodosFromServer = await server.getAllTodosFromServer();
                setTodos(allTodosFromServer);
            } catch {
                alert("Could not get todos from server, please try again.");
            }
        };
        fetchTodos();
    }, []);

    const addTaskHandler = async () => {
        try {
            const newTask = await server.addNewTaskToServer(inputVal);
            const newTodos = [newTask, ...todos];
            setTodos(newTodos);
            setInputVal("");
        } catch {
            alert("Could not add task to server, please try again.");
        }
    };

    const changedInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value;
        setInputVal(newVal);
    };

    const handleDelete = async (id: string) => {
        try {
            await server.deleteTaskFromServer(id);
            const newTodos = [...todos].filter((el) => el.id !== id);
            setTodos(newTodos);
        } catch {
            alert("Could not delete task from server, please try again.");
        }
    };

    const handleCheck = async (id: string) => {
        let newTodos = [...todos];
        const taskIdx = newTodos.findIndex((el) => el.id === id);
        let newTask = newTodos.splice(taskIdx, 1)[0];
        newTask.checked = !newTask.checked;
        newTask.checked ? newTodos.push(newTask) : newTodos.unshift(newTask);
        try {
            await server.checkTaskInServer(id, newTask.checked);
            setTodos(newTodos);
        } catch {
            alert("Could not check task in server, please try again.");
        }
    };

    const handleSave = async (id: string, newTitle: string) => {
        const newTodos = [...todos];
        const taskIdx = newTodos.findIndex((el) => el.id === id);
        newTodos[taskIdx].title = newTitle;
        try {
            await server.editTaskTitleInServer(id, newTitle);
            setTodos(newTodos);
        } catch {
            alert("Could not edit task in server, plaese try again.");
        }
    };

    const showAllTodos = () => {
        return todos.map((task, index) => {
            return (
                <TodoComponent
                    task={task}
                    handleDelete={handleDelete}
                    handleCheck={handleCheck}
                    handleSave={handleSave}
                />
            );
        });
    };

    return (
        <div>
            <InputBar
                inputVal={inputVal}
                changedInputHandler={changedInputHandler}
                addTaskHandler={addTaskHandler}
            />
            {showAllTodos()}
        </div>
    );
};

export default TodoList;
