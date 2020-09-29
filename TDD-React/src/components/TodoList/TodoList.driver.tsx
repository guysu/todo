import "jsdom-global/register";
import React from "react";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ReturnTypeAsync, Todo } from "../../../../common/types";
import TodoList from "./TodoList";
import TodoComponent from "../TodoComponent/TodoComponent";
import axios from "axios";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

const mockAxiosGet = (data: Todo[]) => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
        if (url === "/todos") {
            return Promise.resolve({
                status: 200,
                data,
            });
        }
        return axios.get(url);
    });
};

const mockAxiosPost = () => {
    jest.spyOn(axios, "post").mockImplementation((url, data) => {
        if (url === "/todos") {
            return Promise.resolve({
                status: 200,
                data: { id: 123, ...data },
            });
        }
        return axios.post(url);
    });
};

const mockAxiosPut = () => {
    jest.spyOn(axios, "put").mockImplementation((url) => {
        if (url.startsWith("/todos")) {
            return Promise.resolve({
                status: 200,
            });
        }
        return axios.put(url);
    });
};

const mockAxiosDelete = () => {
    jest.spyOn(axios, "delete").mockImplementation((url) => {
        if (url.startsWith("/todos")) {
            return Promise.resolve({
                status: 200,
            });
        }
        return axios.delete(url);
    });
};

export const todoListDriver = async () => {
    let wrapper: ReactWrapper;

    const simulateClick = async (elem: string, loc = 0) => {
        await act(async () => {
            wrapper.find(`[data-hook="${elem}"]`).at(loc).simulate("click");
        });
        wrapper.update();
    };

    return {
        create: async (todosToGet: Todo[]) => {
            mockAxiosGet(todosToGet);
            mockAxiosPost();
            mockAxiosPut();
            mockAxiosDelete();
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
        addTaskFromInput: async (title: string) => {
            await act(async () => {
                await wrapper
                    .find(".add-task-input")
                    .simulate("change", { target: { value: title } });
            });
            await simulateClick("add-task-btn");
        },
        deleteTaskAt: async (loc: number) => {
            await simulateClick("delete-btn", loc);
        },
        checkTaskAt: async (loc: number, value: boolean) => {
            await act(async () => {
                wrapper
                    .find('[data-hook="checkbox"]')
                    .at(loc)
                    .simulate("change", { target: { checked: value } });
            });
            wrapper.update();
        },
        isFirstTaskChecked: () => {
            return wrapper.find(`.finished-task`).exists();
        },
        editTaskAt: async (loc: number, title: string) => {
            await simulateClick("edit-btn", loc);
            await act(async () => {
                wrapper
                    .find('[data-hook="edit-input"]')
                    .simulate("change", { target: { value: title } });
            });
            wrapper.update();
            await simulateClick("save-btn", loc);
        },
        spyOnPost: () => jest.spyOn(axios, "post"),
        spyOnDelete: () => jest.spyOn(axios, "delete"),
        spyOnPut: () => jest.spyOn(axios, "put"),
    };
};

export type TodoListDriver = ReturnTypeAsync<typeof todoListDriver>;
