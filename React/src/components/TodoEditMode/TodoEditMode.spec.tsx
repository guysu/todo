import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoEditMode from "./TodoEditMode";

configure({ adapter: new Adapter() });

describe("Testing <TodoEditMode />", () => {
    it("Should render input with given value", () => {
        const wrapper = mount(
            <TodoEditMode currTitle="Testing" saveHandler={() => {}} />
        );
        
        expect(wrapper.find(".edit-input").props().value).toEqual("Testing");
    });

    it("Should render save button", () => {
        const wrapper = mount(
            <TodoEditMode currTitle="Testing" saveHandler={() => {}} />
        );

        expect(wrapper.find(".save-btn").exists()).toEqual(true);
    });
});
