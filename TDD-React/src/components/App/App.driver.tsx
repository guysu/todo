import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import { ReturnTypeAsync } from "../../../../common/types";
import TodoList from "../TodoList/TodoList";
import axios from "axios";

configure({ adapter: new Adapter() });

const mockAxiosGet = () => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
        if (url === "/todos") {
            return Promise.resolve({
                status: 200,
                statusText: "OK",
                data: [],
            });
        }
        return axios.get(url);
    });
}

export const appDriver = async () => {
    mockAxiosGet();
    let wrapper = await mount(<App />);

    return {
        getTitleText: () => {
            return wrapper.find(`[data-hook="Header"]`).text();
        },
        isSingleTodoListExists: () => {
            return wrapper.find(TodoList).length === 1;
        },
    };
};

export type AppDriver = ReturnTypeAsync<typeof appDriver>;


