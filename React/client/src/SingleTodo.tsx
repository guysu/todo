import React, { Component, ChangeEvent } from "react";
import { Todo } from "../../../common/types";
import DeleteBtn from "./action-buttons/DeleteBtn";
import EditBtn from "./action-buttons/EditBtn";
import TodoEditMode from "./TodoEditMode";

type TodoProps = {
    task: Todo;
    handleDelete: (id: string) => void;
    handleCheck: (id: string) => void;
    handleSave: (id: string, title: string) => void;
};

type TodoState = {
    inEditMode: boolean;
};

export class SingleTodo extends Component<TodoProps> {
    state: TodoState = {
        inEditMode: false,
    };

    handleEdit = () => {
        this.setState({
            inEditMode: true,
        });
    };

    internalSaveHandler = (editInputVal: string) => {
        this.props.handleSave(this.props.task.id, editInputVal);
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
                <EditBtn handleEdit={this.handleEdit} />
                <DeleteBtn taskId={task.id} handleDelete={handleDelete} />
            </div>
        );
    };

    renderEditMode = () => {
        return (
            <TodoEditMode
                currTitle={this.props.task.title}
                saveHandler={this.internalSaveHandler}
            />
        );
    };

    render() {
        return this.state.inEditMode ? this.renderEditMode() : this.renderDisplayMode();
    }
}

export default SingleTodo;
