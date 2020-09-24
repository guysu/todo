import React from "react";
import "./DeleteBtn.scss";

type DeleteProps = { taskID: string, deleteHandler: (id: string) => void };

const DeleteBtn = (props: DeleteProps) => {
    const {deleteHandler, taskID} = props;

    return (
        <button
            data-hook="delete-btn"
            className="delete-btn"
            onClick={() => deleteHandler(taskID)}
        >
            Delete
        </button>
    );
};

export default DeleteBtn;
