import React, { Component, ChangeEvent } from "react";
import SingleTodo from "./SingleTodo";
import { Todo } from "../../../common/types";
import InputBar from "./InputBar";
import * as server from "./server-api";

type TodoListState = {
    todos: Todo[];
    inputVal: string;
};

export class TodoList extends Component {
    state: TodoListState = {
        todos: [],
        inputVal: "",
    };

    async componentDidMount() {
        try {
            const allTodosFromServer = await server.getAllTodosFromServer();
            this.setState({
                todos: allTodosFromServer,
            });
        } catch {
            alert("Could not get todos from server, please try again.");
        }
    }

    addTaskHandler = async () => {
        try {
            const newTask = await server.addNewTaskToServer(this.state.inputVal);
            const newTodos = [newTask, ...this.state.todos];
            this.setState({
                todos: newTodos,
                inputVal: "",
            });
        } catch {
            alert("Could not add task to server, please try again.");
        }
    };

    changedInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value;
        this.setState({
            inputVal: newVal,
        });
    };

    handleDelete = async (id: string) => {
        try {
            await server.deleteTaskFromServer(id);
            const newTodos = [...this.state.todos].filter((el) => el.id !== id);
            this.setState({
                todos: newTodos,
            });
        } catch {
            alert("Could not delete task from server, please try again.");
        }
    };

    handleCheck = async (id: string) => {
        let newTodos = [...this.state.todos];
        const taskIdx = newTodos.findIndex((el) => el.id === id);
        let newTask = newTodos.splice(taskIdx, 1)[0];
        newTask.checked = !newTask.checked;
        newTask.checked ? newTodos.push(newTask) : newTodos.unshift(newTask);
        try {
            await server.checkTaskInServer(id, newTask.checked);
            this.setState({
                todos: newTodos,
            });
        } catch {
            alert("Could not check task in server, please try again.");
        }
    };

    handleSave = async (id: string, newTitle: string) => {
        const newTodos = [...this.state.todos];
        const taskIdx = newTodos.findIndex((el) => el.id === id);
        newTodos[taskIdx].title = newTitle;
        try {
            await server.editTaskTitleInServer(id, newTitle);
            this.setState({
                todos: newTodos,
            });
        } catch {
            alert("Could not edit task in server, plaese try again.");
        }
    };

    private showAllTodos(): React.ReactNode {
        return this.state.todos.map((task, index) => {
            return (
                <SingleTodo
                    task={task}
                    handleDelete={this.handleDelete}
                    handleCheck={this.handleCheck}
                    handleSave={this.handleSave}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <InputBar
                    inputVal={this.state.inputVal}
                    changedInputHandler={this.changedInputHandler}
                    addTaskHandler={this.addTaskHandler}
                />
                {this.showAllTodos()}
            </div>
        );
    }
}

export default TodoList;
