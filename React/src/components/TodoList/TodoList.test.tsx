import "jsdom-global/register";
import React from "react";
import { configure, mount, ReactWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodoList from "./TodoList";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { TodoComponent } from "../TodoComponent/TodoComponent";
import { Todo } from "../../../../common/types";
import TodoEditMode from "../TodoEditMode/TodoEditMode";

configure({ adapter: new Adapter() });

let wrapper: any;

const testItems = {
    noItems: [],
    oneItem: [{ id: "123", title: "Test", checked: false }],
    twoItems: [
        { id: "123", title: "Test", checked: false },
        { id: "111", title: "Try", checked: false },
    ],
    oneItemChecked: [{ id: "123", title: "Test", checked: true }],
};

const create = async () => {
    await act(async () => {
        wrapper = await mount(<TodoList />);
    });
    wrapper.update();
};

const mockGet = (data: Todo[]) => {
    jest.spyOn(axios, "get").mockResolvedValue({
        status: 200,
        statusText: "OK",
        data,
    });
};

const simulateClick = async (toSimulate: string) => {
    await act(async () => {
        await wrapper.find(toSimulate).simulate("click");
    });
    wrapper.update();
};

describe("Testing <TodoList />", () => {
    const mockDelete = () => {
        jest.spyOn(axios, "delete").mockResolvedValue({});
    };

    const mockEdit = () => {
        jest.spyOn(axios, "put").mockResolvedValue({});
    };

    it("Should render zero <TodoComponent /> from axios", async () => {
        mockGet(testItems.noItems);
        await create();

        expect(wrapper.find(TodoComponent)).toHaveLength(0);
    });

    it("Should render one <TodoComponent /> from axios", async () => {
        mockGet(testItems.oneItem);
        await create();

        expect(wrapper.find(TodoComponent)).toHaveLength(1);
    });

    it("Should render zero <TodoComponent /> after delete", async () => {
        mockGet(testItems.oneItem);
        mockDelete();
        await create();
        await simulateClick(".delete-btn");

        expect(wrapper.find(TodoComponent)).toHaveLength(0);
    });

    it("Should render one <TodoComponent /> after delete", async () => {
        mockGet(testItems.twoItems);
        mockDelete();
        await create();
        await act(async () => {
            await wrapper.find(".delete-btn").at(0).simulate("click");
        });
        wrapper.update();

        expect(wrapper.find(TodoComponent)).toHaveLength(1);
    });

    it("Should render one <TodoEditMode /> after edit", async () => {
        mockGet(testItems.oneItem);
        await create();
        await simulateClick(".edit-btn");

        expect(wrapper.find(TodoEditMode)).toHaveLength(1);
    });

    it("Should render one <TodoComponent /> after edit and save", async () => {
        mockGet(testItems.oneItem);
        mockEdit();
        await create();
        await act(async () => {
            await simulateClick(".edit-btn");
            wrapper.update();
            await wrapper
                .find(".edit-input")
                .simulate("change", { target: { value: "Edited Task" } });
            await simulateClick(".save-btn");
        });

        expect(wrapper.find(TodoComponent)).toHaveLength(1);
    });

    it("Should edit a single <TodoComponent />", async () => {
        mockGet(testItems.oneItem);
        mockEdit();
        await create();
        await act(async () => {
            await simulateClick(".edit-btn");
            wrapper.update();
            await wrapper
                .find(".edit-input")
                .simulate("change", { target: { value: "Edited Task" } });
            await simulateClick(".save-btn");
        });

        expect(
            wrapper.contains(<span className="task-title ">Edited Task</span>)
        ).toEqual(true);
    });

    it("Should render one checked <TodoComponent /> from axios", async () => {
        mockGet(testItems.oneItemChecked);
        await create();

        expect(wrapper.find(".finished-task")).toHaveLength(1);
    });

    it("Should render checked task when checking checkbox", async () => {
        mockGet(testItems.oneItem);
        await create();
        await act(async () => {
            await wrapper
                .find(".checkbox")
                .simulate("change", { target: { checked: true } });
        });
        wrapper.update();

        expect(wrapper.find(".finished-task")).toHaveLength(1);
    });

    it("Should render unchecked task when unchecking checkbox", async () => {
        mockGet(testItems.oneItemChecked);
        await create();
        await act(async () => {
            await wrapper
                .find(".checkbox")
                .simulate("change", { target: { checked: false } });
        });
        wrapper.update();

        expect(wrapper.find(".finished-task")).toHaveLength(0);
    });

    it("Should render one <TodoComponent /> when adding task", async () => {
        mockGet(testItems.noItems);
        jest.spyOn(axios, "post").mockResolvedValue({
            status: 200,
            statusText: "OK",
            data: [],
        });
        await create();
        await act(async () => {
            await wrapper
                .find(".add-task-input")
                .simulate("change", { target: { value: "Test" } });
            await simulateClick(".add-task-btn");
        });
        wrapper.update();

        expect(wrapper.find(".finished-task")).toHaveLength(0);
    });
});

describe("Test call of axios functions to server", () => {
    beforeEach(() => {
        mockGet(testItems.oneItemChecked);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should delete on DB after click on delete", async () => {
        const axiosDeleteDB = jest.spyOn(axios, "delete");
        await create();
        await simulateClick(".delete-btn");

        expect(axiosDeleteDB).toHaveBeenCalledWith("/todos/123");
    });

    it("Should edit on DB after checking", async () => {
        const axiosEditDB = jest.spyOn(axios, "put");
        await create();
        await act(async () => {
            await wrapper
                .find(".checkbox")
                .simulate("change", { target: { checked: true } });
        });
        expect(axiosEditDB).toHaveBeenCalledWith("/todos/123", { checked: true });
    });

    it("Should edit on DB after edit title", async () => {
        const axiosEditDB = jest.spyOn(axios, "put");
        await create();
        await act(async () => {
            await simulateClick(".edit-btn");
            wrapper.update();
            await wrapper
                .find(".edit-input")
                .simulate("change", { target: { value: "Edited Task" } });
            await simulateClick(".save-btn");
        });

        expect(axiosEditDB).toHaveBeenCalledWith("/todos/123", { title: "Edited Task" });
    });

    it("Should add task on DB when adding task", async () => {
        mockGet(testItems.noItems);
        const axiosAddDB = jest.spyOn(axios, "post");
        axiosAddDB.mockResolvedValue({
            status: 200,
            statusText: "OK",
            data: [],
        });
        await create();
        await act(async () => {
            await wrapper
                .find(".add-task-input")
                .simulate("change", { target: { value: "Test" } });
            await simulateClick(".add-task-btn");
        });
        wrapper.update();

        expect(axiosAddDB).toHaveBeenCalledWith("/todos", {
            title: "Test",
            checked: false,
        });
    });
});
