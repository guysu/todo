import React from "react";
import './EditBtn.scss';

type EditBtnProps = {
    handleEdit: () => void;
};

export const EditBtn = (props: EditBtnProps) => {
    return (
        <button onClick={props.handleEdit} className="edit-btn">
            Edit
        </button>
    );
};

export default EditBtn;
