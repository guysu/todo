import React, { useState } from "react";
import "./TodoEditMode.scss";

type TodoEditModeProps = {
    taskTitle: string;
    saveHandler: (newValue: string) => void;
};

const TodoEditMode = (props: TodoEditModeProps) => {
    const [inputVal, setInputVal] = useState(props.taskTitle);

    const { saveHandler } = props;

    return (
        <div>
            <input
                className="edit-input"
                data-hook="edit-input"
                onChange={(e) => setInputVal(e.target.value)}
                value={inputVal}
                autoFocus
                onKeyPress={(e) => (e.key === "Enter" ? saveHandler(inputVal) : null)}
            />
            <button
                className="save-btn"
                data-hook="save-btn"
                onClick={() => saveHandler(inputVal)}
            >
                Save
            </button>
        </div>
    );
};

export default TodoEditMode;
