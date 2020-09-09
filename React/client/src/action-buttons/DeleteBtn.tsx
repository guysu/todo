import React from "react";

type DeleteBtnProps = {
    taskId: string;
    handleDelete: (id: string) => void;
};

export const DeleteBtn = (props: DeleteBtnProps) => {
    return (
        <button className="delete-btn" onClick={() => props.handleDelete(props.taskId)}>
            Delete
        </button>
    );
};

export default DeleteBtn;
