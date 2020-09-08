import React, { Component } from "react";
import "./style.scss";
import Header from "./Header";
import AllTodos from "./AllTodos";


export class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <AllTodos />
            </div>
        );
    }
}

export default App;
