import "jsdom-global/register";
import React from "react";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { ReturnTypeAsync } from "../../../../common/types";

configure({ adapter: new Adapter() });

let wrapper: ReactWrapper;
const mockedResult = {
    status: 200,
    statusText: "OK",
    data: [{ id: "Test", title: "", checked: false }],
};

export const appDriver = async () => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
        if (url === "/todos") {
            return Promise.resolve(mockedResult);
        }
        return axios.get(url);
    });

    await act(async () => {
        wrapper = await mount(<App />);
    });

    return {
        countHeaderNum: () => wrapper.find(Header).length,
        countTodoListNum: () => wrapper.find(TodoList).length,
    };
};

export type AppDriver = ReturnTypeAsync<typeof appDriver>;
