import React, { Component } from "react";
import "./App.scss";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";

export class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <TodoList />
            </div>
        );
    }
}

export default App;
