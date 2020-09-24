import { todoListDriver, TodoListDriver } from "./TodoList.driver";

const testItems = {
    noItems: [],
    oneItem: [{ id: "123", title: "Test", checked: false }],
    twoItems: [
        { id: "123", title: "Test", checked: false },
        { id: "111", title: "Try", checked: false },
    ],
    oneItemChecked: [{ id: "123", title: "Test", checked: true }],
};

describe("Basic Testing <TodoList />", () => {
    let driver: TodoListDriver;

    beforeEach(async () => {
        driver = await todoListDriver();
        await driver.create([]);
    });

    it("should show an input field and add button", () => {
        expect(driver.isInputFieldExists()).toEqual(true);
        expect(driver.isAddBtnExists()).toEqual(true);
    });

    it("should show task when updating state", () => {
        expect(driver.getTasksNum()).toEqual(0);

        driver.addTaskFromState("Testing");

        expect(driver.getTasksNum()).toEqual(1);
        expect(driver.getTaskTitleAt(0)).toEqual("Testing");
    });

    it("should show task when adding through input bar", () => {
        driver.addTaskFromInput("Testing");

        expect(driver.getTasksNum()).toEqual(1);
        expect(driver.getTaskTitleAt(0)).toEqual("Testing");
    });

    it("should support delete", () => {
        driver.addTaskFromInput("Testing");
        expect(driver.getTasksNum()).toEqual(1);

        driver.deleteTaskAt(0);
        expect(driver.getTasksNum()).toEqual(0);
    });

    it("should support check", () => {
        driver.addTaskFromInput("Testing");
        expect(driver.isFirstTaskChecked()).toEqual(false);

        driver.checkTaskAt(0);
        expect(driver.isFirstTaskChecked()).toEqual(true);
    });

    it("should support edit task", () => {
        driver.addTaskFromInput("Testing");
        expect(driver.isFirstTaskChecked()).toEqual(false);

        driver.editTaskAt(0, "Edited Task");

        expect(driver.getTaskTitleAt(0)).toEqual("Edited Task");
    });
});

describe("Testing <TodoList /> with server", () => {
    let driver: TodoListDriver;

    beforeEach(async () => {
        driver = await todoListDriver();
    });

    it("should support getting single todo from server", async () => {
        await driver.create(testItems.oneItem);

        expect(driver.getTasksNum()).toEqual(1);
    });
});
