import React from "react";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import EditBtn from "../EditBtn/EditBtn";
import "./TodoComponent.scss";
import { Todo } from "../../../../common/types";

type TodoComponentProps = { task: Todo };

export const TodoComponent = (props: TodoComponentProps) => {
    return (
        <div className="single-task">
            <input type="checkbox" data-hook="checkbox" className="checkbox" />
            <span data-hook="task-title" className="task-title">
                {props.task.title}
            </span>
            <DeleteBtn />
            <EditBtn />
        </div>
    );
};

export default TodoComponent;
