import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ReturnTypeAsync } from "../../../../common/types";
import TodoComponent from "./TodoComponent";
import DeleteBtn from '../DeleteBtn/DeleteBtn'
import EditBtn from "../EditBtn/EditBtn";

configure({ adapter: new Adapter() });

export const todoComponentDriver = () => {
    const testTask = {id:"1", title: "test", checked:false};
    const wrapper = mount(<TodoComponent task={testTask}/>);

    return {
        isCheckboxExists: () => wrapper.find(`[data-hook="checkbox"]`).exists(),
        isDeleteBtnExists: () => wrapper.find(DeleteBtn).exists(),
        isEditBtnExists: () => wrapper.find(EditBtn).exists(),
    };
};

export type TodoComponentDriver = ReturnTypeAsync<typeof todoComponentDriver>;
