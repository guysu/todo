import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoEditMode from "./TodoEditMode";

configure({ adapter: new Adapter() });

export const todoEditModeDriver = (
    currTitleVal: string,
    saveHandler: (val: string) => void
) => {
	
    const wrapper = mount(
        <TodoEditMode currTitle={currTitleVal} saveHandler={saveHandler} />
    );

    return {
        getInputVal: () => wrapper.find(".edit-input").props().value,
		checkSaveBtnExist: () => wrapper.find(".save-btn").exists()
    };
};

export type TodoEditModeDriver = ReturnType<typeof todoEditModeDriver>
