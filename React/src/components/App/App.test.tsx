import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import axios from "axios";
import { act } from "react-dom/test-utils";

configure({ adapter: new Adapter() });

describe("Testing <App />", () => {
    let wrapper: any;

    beforeEach(async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
            status: 200,
            statusText: "OK",
            data: [{ id: "", title: "", checked: false }],
        });
        await act(async () => {
            wrapper = await mount(<App />);
        });
    });

    it("Should render one <Header />", async () => {
        expect(wrapper.find(Header).exists()).toEqual(true);
    });

    it("Should render one <TodoList />", async () => {
        expect(wrapper.find(TodoList).exists()).toEqual(true);
    });
});
