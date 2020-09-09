import React, { useState } from "react";

type EditModeProps = {
    currTitle: string;
    saveHandler: (newTitle: string) => void;
};

export const TodoEditMode = (props: EditModeProps) => {
    const [inputState, setInputState] = useState(props.currTitle);

    return (
        <div className="edit-task">
            <input
                type="text"
                onChange={(e) => setInputState(e.target.value)}
                value={inputState}
                className="edit-input"
            />
            <button onClick={() => props.saveHandler(inputState)} className="save-btn">
                Save Changes
            </button>
        </div>
    );
};

export default TodoEditMode;
