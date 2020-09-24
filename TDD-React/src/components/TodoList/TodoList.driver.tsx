import "jsdom-global/register";
import React from "react";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ReturnTypeAsync, Todo } from "../../../../common/types";
import TodoList from "./TodoList";
import TodoComponent from "../TodoComponent/TodoComponent";
import TodoEditMode from "../TodoEditMode/TodoEditMode";
import axios from "axios";
import { act } from "react-dom/test-utils";


configure({ adapter: new Adapter() });

const mockAxiosGet = (data: Todo[]) => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
        if (url === "/todos") {
            return Promise.resolve({
                status: 200,
                statusText: "OK",
                data,
            });
        }
        return axios.get(url);
    });
};

export const todoListDriver = async () => {
    let wrapper: ReactWrapper;

    return {
        create: async (todosToGet: Todo[]) => {
            mockAxiosGet(todosToGet);
            await act(async () => {
                wrapper = await mount(<TodoList />);
            });
            wrapper.update();
        },
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
        addTaskFromInput: (title: string) => {
            wrapper
                .find(".add-task-input")
                .simulate("change", { target: { value: title } });
            wrapper.find(`[data-hook="add-task-btn"]`).simulate("click");
        },
        deleteTaskAt: (loc: number) => {
            wrapper.find('[data-hook="delete-btn"]').at(loc).simulate("click");
        },
        checkTaskAt: (loc: number) => {
            wrapper
                .find('[data-hook="checkbox"]')
                .at(loc)
                .simulate("change", { target: { checked: true } });
        },
        isFirstTaskChecked: () => {
            return wrapper.find(`.finished-task`).exists();
        },
        editTaskAt: (loc: number, title: string) => {
            wrapper.find('[data-hook="edit-btn"]').at(loc).simulate("click");
            wrapper
                .find('[data-hook="edit-input"]')
                .simulate("change", { target: { value: title } });
            wrapper.find('[data-hook="save-btn"]').simulate("click");
        },
        isFirstTaskInEditMode: () => {
            return wrapper.find(TodoEditMode).exists();
        },
    };
};

export type TodoListDriver = ReturnTypeAsync<typeof todoListDriver>;
