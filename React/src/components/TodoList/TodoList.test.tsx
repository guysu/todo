import "jsdom-global/register";
import React from "react";
import { configure, shallow, mount, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoList from "./TodoList";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { TodoComponent } from "../TodoComponent/TodoComponent";
import { Todo } from "../../../../common/types";
import TodoEditMode from "../TodoEditMode/TodoEditMode";

configure({ adapter: new Adapter() });

describe.only("Testing <TodoList />", () => {
    let wrapper: any;

    const noItems: Todo[] = [];
    const oneItem = [{ id: "123", title: "Test", checked: false }];
    const twoItems = [
        { id: "123", title: "Test", checked: false },
        { id: "111", title: "Try", checked: false },
    ];
    const oneItemChecked = [{ id: "123", title: "Test", checked: true }];

    const create = async () => {
        await act(async () => {
            wrapper = await mount(<TodoList />);
        });
        wrapper.setProps();
    };

    const mockGet = (data: Todo[]) => {
        jest.spyOn(axios, "get").mockResolvedValue({
            status: 200,
            statusText: "OK",
            data,
        });
    };

    const mockDelete = () => {
        jest.spyOn(axios, "delete").mockResolvedValue({});
    };

    const mockEdit = () => {
        jest.spyOn(axios, "put").mockResolvedValue({});
    };

    it("Should render zero <TodoComponent /> from axios", async () => {
        mockGet(noItems);
        await create();
        expect(wrapper.find(TodoComponent)).toHaveLength(0);
    });

    it("Should render one <TodoComponent /> from axios", async () => {
        mockGet(oneItem);
        await create();
        expect(wrapper.find(TodoComponent)).toHaveLength(1);
    });

    it("Should render zero <TodoComponent /> after delete", async () => {
        mockGet(oneItem);
        mockDelete();
        await create();
        await act(async () => {
            await wrapper.find(".delete-btn").simulate("click");
        });
        wrapper.setProps();
        expect(wrapper.find(TodoComponent)).toHaveLength(0);
    });

    it("Should render one <TodoComponent /> after delete", async () => {
        mockGet(twoItems);
        mockDelete();
        await create();
        await act(async () => {
            await wrapper.find(".delete-btn").at(0).simulate("click");
        });
        wrapper.setProps();
        expect(wrapper.find(TodoComponent)).toHaveLength(1);
    });

    it("Should render one <TodoEditMode /> after edit", async () => {
        mockGet(oneItem);
        await create();
        await act(async () => {
            await wrapper.find(".edit-btn").simulate("click");
        });
        wrapper.setProps();
        expect(wrapper.find(TodoEditMode)).toHaveLength(1);
    });

    it("Should render one <TodoComponent /> after edit and save", async () => {
        mockGet(oneItem);
        mockEdit();
        await create();
        await act(async () => {
            await wrapper.find(".edit-btn").simulate("click");
            wrapper.setProps();
            await wrapper
                .find(".edit-input")
                .simulate("change", { target: { value: "Edited Task" } });
            await wrapper.find(".save-btn").simulate("click");
        });
        expect(wrapper.find(TodoComponent)).toHaveLength(1);
    });

    it("Should edit a single <TodoComponent />", async () => {
        mockGet(oneItem);
        mockEdit();
        await create();
        await act(async () => {
            await wrapper.find(".edit-btn").simulate("click");
            wrapper.setProps();
            await wrapper
                .find(".edit-input")
                .simulate("change", { target: { value: "Edited Task" } });
            await wrapper.find(".save-btn").simulate("click");
        });
        expect(
            wrapper.contains(<span className="task-title ">Edited Task</span>)
        ).toEqual(true);
    });

    it("Should render one checked <TodoComponent /> from axios", async () => {
        mockGet(oneItemChecked);
        await create();
        expect(wrapper.find(".finished-task")).toHaveLength(1);
    });

    it("Should render checked task when checking checkbox", async () => {
        mockGet(oneItem);
        await create();
        await act(async () => {
            await wrapper
                .find(".checkbox")
                .simulate("change", { target: { checked: true } });
            wrapper.setProps();
        });
        expect(wrapper.find(".finished-task")).toHaveLength(1);
    });

    it("Should render unchecked task when unchecking checkbox", async () => {
        mockGet(oneItemChecked);
        await create();
        await act(async () => {
            await wrapper
                .find(".checkbox")
                .simulate("change", { target: { checked: false } });
            wrapper.setProps();
        });
        expect(wrapper.find(".finished-task")).toHaveLength(0);
    });
});
