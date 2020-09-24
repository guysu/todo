import React, { Component } from "react";
import InputBar from "../InputBar/InputBar";
import TodoComponent from "../TodoComponent/TodoComponent";
import { Todo } from "../../../../common/types";
import * as server from "../../services/server-api";
const uuid = require("uuid");

type TodoListState = {
    todos: Todo[];
};

export class TodoList extends Component {
    state: TodoListState = { todos: [] };

    componentDidMount = async () => {
        try {
            const allTodos = await server.getTodos();
            this.setState({ todos: allTodos });
        } catch (e) {
            console.log(e.message);
        }
    };

    addTaskHandler = (title: string) => {
        const newTask: Todo = { id: uuid.v4(), title, checked: false };
        const todos = [newTask, ...this.state.todos];
        this.setState({ todos });
    };

    deleteTaskHandler = (id: string) => {
        const todos = this.state.todos.filter((el) => el.id !== id);
        this.setState({ todos });
    };

    checkTaskHandler = (id: string, newValue: boolean) => {
        const todoList = [...this.state.todos];
        const newTodoIdx = todoList.findIndex((el) => el.id === id);
        const newTodo = todoList.splice(newTodoIdx, 1)[0];
        newTodo.checked = newValue;
        const newTodoList = newValue ? [...todoList, newTodo] : [newTodo, ...todoList];
        this.setState({ todos: newTodoList });
    };

    saveTaskHandler = (id: string, newValue: string) => {
        const todoList = [...this.state.todos];
        let newTodo = todoList.find((el) => el.id === id)!;
        newTodo.title = newValue;
        this.setState({ todos: todoList });
    };

    renderTodos = () => {
        return this.state.todos.map((el, idx) => {
            return (
                <TodoComponent
                    key={idx}
                    task={el}
                    deleteHandler={this.deleteTaskHandler}
                    checkHandler={this.checkTaskHandler}
                    saveHandler={this.saveTaskHandler}
                />
            );
        });
    };

    render() {
        return (
            <div>
                <InputBar addTaskHandler={this.addTaskHandler} />
                {this.renderTodos()}
            </div>
        );
    }
}

export default TodoList;
