import React, { useState } from "react";
import "./InputBar.scss";

type InputBarProps = { addTaskHandler: (title: string) => void };

const InputBar = (props: InputBarProps) => {
    const [inputVal, setInputVal] = useState("");

    const handleAddBtnPress = () => {
        props.addTaskHandler(inputVal);
        setInputVal("");
    };

    return (
        <div className="add-task">
            <input
                placeholder="Please enter new task..."
                data-hook="add-task-input"
                className="add-task-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyPress={(e) => (e.key === "Enter" ? handleAddBtnPress() : null)}
            />
            <button
                data-hook="add-task-btn"
                className="add-task-btn"
                onClick={() => handleAddBtnPress()}
            >
                Add
            </button>
        </div>
    );
};

export default InputBar;
