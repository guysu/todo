import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ReturnTypeAsync } from "../../../../common/types";
import TodoComponent from "./TodoComponent";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import EditBtn from "../EditBtn/EditBtn";
import TodoEditMode from "../TodoEditMode/TodoEditMode";

configure({ adapter: new Adapter() });

export const todoComponentDriver = () => {
    const testTask = { id: "1", title: "test", checked: false };
    const wrapper = mount(
        <TodoComponent
            task={testTask}
            deleteHandler={() => {}}
            checkHandler={() => {}}
            saveHandler={() => {}}
        />
    );

    return {
        isCheckboxExists: () => wrapper.find(`[data-hook="checkbox"]`).length === 1,
        isDeleteBtnExists: () => wrapper.find(DeleteBtn).length === 1,
        isEditBtnExists: () => wrapper.find(EditBtn).length === 1,
        enterEditMode: () => wrapper.find('[data-hook="edit-btn"]').simulate("click"),
        isInEditMode: () => wrapper.find(TodoEditMode).length === 1,
    };
};

export type TodoComponentDriver = ReturnTypeAsync<typeof todoComponentDriver>;
