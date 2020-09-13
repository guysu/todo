import React, { ChangeEvent } from "react";
import "./InputBar.scss";

type InpurBarProps = {
    inputVal: string;
    changedInputHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    addTaskHandler: (val: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const InputBar = (props: InpurBarProps) => {
    return (
        <div className="add-task">
            <input
                type="text"
                placeholder="Please enter a new tesk"
                onChange={props.changedInputHandler}
                value={props.inputVal}
                className="add-task-input"
            />
            <button onClick={props.addTaskHandler} className="add-task-btn">
                Add
            </button>
        </div>
    );
};

export default InputBar;
