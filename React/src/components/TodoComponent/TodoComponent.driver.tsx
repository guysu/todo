import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoComponent from "./TodoComponent";
import { Todo } from "../../../../common/types";

configure({ adapter: new Adapter() });

type PropsType = {
    task?: Todo;
    handleDelete?: (id: string) => void;
    handleCheck?: (id: string) => void;
    handleSave?: (id: string, title: string) => void;
};

const emptyFunc = () => {};

export const todoComponentDriver = ({
    task = { id: "123", title: "Test", checked: false },
    handleCheck = emptyFunc,
    handleDelete = emptyFunc,
    handleSave = emptyFunc,
}: PropsType) => {
    const wrapper = mount(
        <TodoComponent
            task={task}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleSave={handleSave}
        />
    );

    return {
        isCheckboxExists: () => wrapper.find(".checkbox").exists(),
        getTaskTitle: () => wrapper.find(`[data-hook="task-title"]`).text(),
        isEditBtnExists: () => wrapper.find(".edit-btn").exists(),
        isDeleteBtnExists: () => wrapper.find(".delete-btn").exists(),
    };
};

export type TodoComponentDriver = ReturnType<typeof todoComponentDriver>;
