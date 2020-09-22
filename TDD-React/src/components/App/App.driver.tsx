import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import { ReturnTypeAsync } from "../../../../common/types";

configure({ adapter: new Adapter() });

export const appDriver = () => {
    let wrapper = mount(<App />);

    return {
        isSingleHeaderExists: () => {
            return wrapper.find(`[data-hook="Header"]`).length === 1;
        },
        isSingleTodoListExists: () => {
            return wrapper.find(`[data-hook="TodoList"]`).length === 1;
        },
    };
};

export type AppDriver = ReturnTypeAsync<typeof appDriver>;
