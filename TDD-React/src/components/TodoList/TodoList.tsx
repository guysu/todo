import React, { Component } from "react";
import InputBar from "../InputBar/InputBar";
import TodoComponent from "../TodoComponent/TodoComponent";
import { Todo } from "../../../../common/types";
const uuid = require("uuid");

type TodoListState = {
    todos: Todo[];
};

export class TodoList extends Component {
    state: TodoListState = { todos: [] };

    addTaskHandler = (title: string) => {
        const newTask: Todo = { id: uuid.v4(), title, checked: false };
        const todos = [newTask, ...this.state.todos];
        this.setState({ todos });
    };

    renderTodos = () => {
        return this.state.todos.map((el, idx) => {
            return <TodoComponent key={idx} task={el} />;
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
