import "jsdom-global/register";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./Header";

configure({ adapter: new Adapter() });

export const headerDriver = () => {
	const wrapper = mount(<Header />);

	return {
		isTitlePresent: () => wrapper.contains(<h1>Welcome To The TODO List!</h1>)
	}
}