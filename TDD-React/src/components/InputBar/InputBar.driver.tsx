import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ReturnTypeAsync } from "../../../../common/types";
import InputBar from "./InputBar";

configure({ adapter: new Adapter() });

export const inputBarDriver = () => {
    const wrapper = mount(<InputBar addTaskHandler={() => {}} />);

    return {
        getInputValue: () => wrapper.find(`[data-hook="add-task-input"]`).props().value,
        insertTaskTitle: (title: string) => {
            wrapper
                .find(".add-task-input")
                .simulate("change", { target: { value: title } });
        },
        clickAddBtn: () => wrapper.find(`[data-hook="add-task-btn"]`).simulate("click"),
        pressEnter: () => {
            wrapper.find(".add-task-input").simulate("keypress", { key: "Enter" });
        },
    };
};

export type InputBarDriver = ReturnTypeAsync<typeof inputBarDriver>;
