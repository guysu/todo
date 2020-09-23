import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import { ReturnTypeAsync } from "../../../../common/types";
import TodoList from '../TodoList/TodoList';

configure({ adapter: new Adapter() });

export const appDriver = () => {
    let wrapper = mount(<App />);

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
