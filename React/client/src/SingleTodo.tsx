import React, { Component, ChangeEvent } from "react";
import { Todo } from "../../common/types";

type TodoProps = {
    task: Todo;
    handleDelete: (id: string) => void;
    handleCheck: (id: string) => void;
    handleSave: (id: string, title: string) => void;
};

type TodoState = {
    inEditMode: boolean;
    editInputVal: string;
};

export class SingleTodo extends Component<TodoProps> {
    state: TodoState = {
        inEditMode: false,
        editInputVal: "",
    };

    handleEdit = () => {
        this.setState({
            inEditMode: true,
            editInputVal: this.props.task.title,
        });
    };

    handleChangeEditMode = (event: ChangeEvent<HTMLInputElement>) => {
        const newVal = event.target.value;
        this.setState({
            editInputVal: newVal,
        });
    };

    internalSaveHandler = () => {
        this.props.handleSave(this.props.task.id, this.state.editInputVal);
        this.setState({
            inEditMode: false,
        });
    };

    renderDisplayMode = () => {
        const { task, handleDelete, handleCheck } = this.props as TodoProps;
        const clazz = `task-title ${task.checked ? "finished-task" : ""}`;
        return (
            <div className="single-task">
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => handleCheck(task.id)}
                    checked={task.checked}
                />
                <span className={clazz}>{task.title}</span>
                <button onClick={this.handleEdit} className="edit-btn">
                    Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                    Delete
                </button>
            </div>
        );
    };

    renderEditMode = () => {
        return (
            <div className="edit-task">
                <input
                    type="text"
                    onChange={this.handleChangeEditMode}
                    value={this.state.editInputVal}
                    className="edit-input"
                />
                <button onClick={this.internalSaveHandler} className="save-btn">
                    Save Changes
                </button>
            </div>
        );
    };

    render() {
        return this.state.inEditMode ? this.renderEditMode() : this.renderDisplayMode();
    }
}

export default SingleTodo;
