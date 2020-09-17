import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoComponent from "./TodoComponent";

configure({ adapter: new Adapter() });

describe("Testing <TodoComponent />", () => {

	const emptyFunc = () => {}
	const props = {
		task: {id:"123", title: "Test", checked: false},
		handleCheck: emptyFunc,
		handleDelete: emptyFunc,
		handleSave: emptyFunc
	}
	const wrapper = mount(<TodoComponent {...props}/>)

	it("Should render checkbox", () => {
		expect(wrapper.find('.checkbox').exists()).toEqual(true);
	})

	it("Should render title", () => {
		expect(wrapper.find(`[data-hook="task-title"]`).text()).toEqual("Test");
	})

	it("Should render edit button", () => {
		expect(wrapper.find('.edit-btn').exists()).toEqual(true);
	})

	it("Should render delete button", () => {
		expect(wrapper.find('.delete-btn').exists()).toEqual(true);
	})
})