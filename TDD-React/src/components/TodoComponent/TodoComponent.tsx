import React, { useState } from "react";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import EditBtn from "../EditBtn/EditBtn";
import "./TodoComponent.scss";
import { Todo } from "../../../../common/types";
import TodoEditMode from "../TodoEditMode/TodoEditMode";

type TodoComponentProps = {
    task: Todo;
    deleteHandler: (id: string) => void;
    checkHandler: (id: string, newValue: boolean) => void;
    saveHandler: (id: string, newValue: string) => void;
};

export const TodoComponent = (props: TodoComponentProps) => {
    const [inEditMode, setInEditMode] = useState(false);

    const { task, checkHandler, deleteHandler } = props;

    const editHandler = () => {
        setInEditMode(true);
    };

    const saveTaskHandler = (title: string) => {
        setInEditMode(false);
        props.saveHandler(task.id, title);
    }

    const renderSingleTask = () => {
        return (
            <div className="single-task">
                <input
                    type="checkbox"
                    data-hook="checkbox"
                    className="checkbox"
                    onChange={(e) => {
                        checkHandler(task.id, e.target.checked);
                    }}
                    checked={task.checked}
                />
                <span
                    data-hook="task-title"
                    className={`task-title ${task.checked ? "finished-task" : ''}`}
                >
                    {task.title}
                </span>
                <DeleteBtn taskID={task.id} deleteHandler={deleteHandler} />
                <EditBtn editHandler={editHandler} />
            </div>
        );
    };

    return inEditMode ? (
        <TodoEditMode taskTitle={task.title} saveHandler={saveTaskHandler} />
    ) : (
        renderSingleTask()
    );
};

export default TodoComponent;
