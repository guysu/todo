import React, { Component } from "react";

export class Header extends Component {
    addTaskHandler = () => {
        console.log("Hi");
    };

    render() {
        return (
            <div>
                <h1>Welcome To The TODO List!</h1>
                <input
                    type="text"
                    placeholder="Please enter a new tesk"
                    className="add-task-input"
                />
                <button onClick={this.addTaskHandler} className="add-task-btn">
                    Add
                </button>
            </div>
        );
    }
}

export default Header;
