import React, { Component } from "react";
import "./style.scss";
import Header from "./Header";
import TodoList from "./TodoList";


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
