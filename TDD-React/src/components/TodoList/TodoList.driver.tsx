import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ReturnTypeAsync } from "../../../../common/types";
import TodoList from "./TodoList";
import TodoComponent from "../TodoComponent/TodoComponent";

configure({ adapter: new Adapter() });

export const todoListDriver = () => {
    let wrapper = mount(<TodoList />);

    return {
        isInputFieldExists: () => {
            return wrapper.find(`[data-hook="add-task-input"]`).exists();
        },
        isAddBtnExists: () => {
            return wrapper.find(`[data-hook="add-task-btn"]`).exists();
        },
        getTasksNum: () => wrapper.find(TodoComponent).length,
        addTaskFromState: (title: string) => {
            wrapper.setState({ todos: [{ id: "1", title, checked: false }] });
        },
        getTaskTitleAt: (loc: number) => {
            return wrapper.find(`[data-hook="task-title"]`).at(loc).text();
        },
        addTaskWithInput: (title: string) => {
            wrapper
                .find(".add-task-input")
                .simulate("change", { target: { value: title } });
            wrapper.find(`[data-hook="add-task-btn"]`).simulate("click");
        },
    };
};

export type TodoListDriver = ReturnTypeAsync<typeof todoListDriver>;
