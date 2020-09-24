import React from "react";
import "./EditBtn.scss";

type EditBtnProps = { editHandler: () => void };

const EditBtn = (props: EditBtnProps) => {
    return (
        <button
            data-hook="edit-btn"
            className="edit-btn"
            onClick={() => {
                props.editHandler();
            }}
        >
            Edit
        </button>
    );
};

export default EditBtn;
