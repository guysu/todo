import React, { Component, ChangeEvent } from "react";
import SingleTodo from "./SingleTodo";
import { Todo } from "../../../common/types";
import InputBar from "./InputBar";
import * as server from "./server-api";

type AllTodosState = {
    Todos: Todo[];
    inputVal: string;
};

export class AllTodos extends Component {
    state: AllTodosState = {
        Todos: [],
        inputVal: "",
    };

    async componentDidMount() {
        const allTodosFromServer = await server.getAllTodosFromServer();
        this.setState({
            Todos: allTodosFromServer,
        });
    }

    addTaskHandler = async () => {
        const newTask = await server.addNewTaskToServer(this.state.inputVal);
        let newTodos = [...this.state.Todos];
        newTodos.unshift(newTask);
        this.setState({
            Todos: newTodos,
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
        const newTodos = [...this.state.Todos].filter((el) => el.id !== id);
        this.setState({
            Todos: newTodos,
        });
    };

    handleCheck = async (id: string) => {
        let newTodos = [...this.state.Todos];
        const taskIdx = newTodos.findIndex((el) => el.id === id);
        let newTask = newTodos.splice(taskIdx, 1)[0];
        newTask.checked = !newTask.checked;
        newTask.checked ? newTodos.push(newTask) : newTodos.unshift(newTask);
        await server.checkTaskInServer(id, newTask.checked);
        this.setState({
            Todos: newTodos,
        });
    };

    handleSave = async (id: string, newTitle: string) => {
        let newTodos = [...this.state.Todos];
        const taskIdx = newTodos.findIndex((el) => el.id === id);
        newTodos[taskIdx].title = newTitle;
        await server.editTaskTitleInServer(id, newTitle);
        this.setState({
            Todos: newTodos,
        });
    };

    private showAllTodos(): React.ReactNode {
        return this.state.Todos.map((task, index) => {
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

export default AllTodos;
