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
        const allTodosFromServer = await server.getAllTodosFromServer();
        this.setState({
            todos: allTodosFromServer,
        });
    }

    addTaskHandler = async () => {
        const newTask = await server.addNewTaskToServer(this.state.inputVal);
        const newTodos = [newTask, ...this.state.todos];
        this.setState({
            todos: newTodos,
            inputVal: "",
        });
    };

    changedInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value;
        this.setState({
            inputVal: newVal,
        });
    };

    handleDelete = async (id: string) => {
        await server.deleteTaskFromServer(id);
        const newTodos = [...this.state.todos].filter((el) => el.id !== id);
        this.setState({
            todos: newTodos,
        });
    };

    handleCheck = async (id: string) => {
        let newTodos = [...this.state.todos];
        const taskIdx = newTodos.findIndex((el) => el.id === id);
        let newTask = newTodos.splice(taskIdx, 1)[0];
        newTask.checked = !newTask.checked;
        newTask.checked ? newTodos.push(newTask) : newTodos.unshift(newTask);
        await server.checkTaskInServer(id, newTask.checked);
        this.setState({
            todos: newTodos,
        });
    };

    handleSave = async (id: string, newTitle: string) => {
        const newTodos = [...this.state.todos];
        const taskIdx = newTodos.findIndex((el) => el.id === id);
        newTodos[taskIdx].title = newTitle;
        await server.editTaskTitleInServer(id, newTitle);
        this.setState({
            todos: newTodos,
        });
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
