import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";

configure({ adapter: new Adapter() });

describe("Testing <App />", () => {
    it("Should render one <Header />", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Header)).toHaveLength(1);
    });

    it("Should render one <TodoList />", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(TodoList)).toHaveLength(1);
    });
});
