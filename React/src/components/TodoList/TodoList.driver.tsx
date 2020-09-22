import "jsdom-global/register";
import React from "react";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoList from "./TodoList";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { TodoComponent } from "../TodoComponent/TodoComponent";
import { Todo, ReturnTypeAsync } from "../../../../common/types";
import TodoEditMode from "../TodoEditMode/TodoEditMode";

configure({ adapter: new Adapter() });

export const todoListDriver = async () => {
    let wrapper: ReactWrapper;

    const mockGet = (data: Todo[]) => {
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

    const mockDelete = () => {
        jest.spyOn(axios, "delete").mockResolvedValue({});
    };

    const mockEdit = () => {
        jest.spyOn(axios, "put").mockResolvedValue({});
    };

    const mockPost = () => {
        jest.spyOn(axios, "post").mockImplementation((url) => {
            if (url === "/todos") {
                return Promise.resolve({
                    status: 200,
                    statusText: "OK",
                    data: [],
                });
            }
            return axios.post(url);
        });
    };

    const simulateClick = async (toSimulate: string, location: number) => {
        await act(async () => {
            await wrapper.find(toSimulate).at(location).simulate("click");
        });
        wrapper.update();
    };

    return {
        create: async (data: Todo[]) => {
            mockGet(data);
            mockDelete();
            mockEdit();
            mockPost();
            await act(async () => {
                wrapper = await mount(<TodoList />);
            });
            wrapper.update();
        },
        close: () => jest.clearAllMocks(),
        countTasksNum: () => wrapper.find(TodoComponent).length,
        deleteTaskAt: async (loc: number) => {
            await simulateClick(".delete-btn", loc);
        },
        enterEditModeAt: async (loc: number) => {
            await simulateClick(".edit-btn", loc);
        },
        countEditModeNum: () => wrapper.find(TodoEditMode).length,
        changeTitleAndSaveAt: async (newTitle: string, loc: number) => {
            await wrapper
                .find(".edit-input")
                .simulate("change", { target: { value: newTitle } });
            await simulateClick(".save-btn", loc);
        },
        getTaskTitleAt: (loc: number) => {
            return wrapper.find(`[data-hook="task-title"]`).at(loc).text();
        },
        countFinishedTasksNum: () => wrapper.find(".finished-task").length,
        checkTaskAt: async (loc: number) => {
            await act(async () => {
                const currVal = wrapper.find(".checkbox").at(loc).props().checked;
                await wrapper
                    .find(".checkbox")
                    .at(loc)
                    .simulate("change", { target: { checked: !currVal } });
            });
            wrapper.update();
        },
        addTask: async (title: string) => {
            await act(async () => {
                await wrapper
                    .find(".add-task-input")
                    .simulate("change", { target: { value: title } });
                await simulateClick(".add-task-btn", 0);
            });
            wrapper.update();
        },
        spyOnAxiosDelete: () => jest.spyOn(axios, "delete"),
        spyOnAxiosPut: () => jest.spyOn(axios, "put"),
        spyOnAxiosPost: () => jest.spyOn(axios, "post"),
    };
};

export type TodoListDriver = ReturnTypeAsync<typeof todoListDriver>;
