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

    it("should support getting single checked todo from server", async () => {
        await driver.create(testItems.oneItemChecked);

        expect(driver.getTasksNum()).toEqual(1);
        expect(driver.isFirstTaskChecked()).toEqual(true);
    });

    it("should support adding todo", async () => {
        await driver.create(testItems.noItems);
        expect(driver.getTasksNum()).toEqual(0);
        const axiosPost = driver.spyOnPost();

        await driver.addTaskFromInput("Testing");

        expect(driver.getTasksNum()).toEqual(1);
        expect(axiosPost).toHaveBeenCalledWith("/todos", {
            title: "Testing",
            checked: false,
        });
    });

    it("should support delete todo", async () => {
        await driver.create(testItems.oneItem);
        expect(driver.getTasksNum()).toEqual(1);
        const axiosDelete = driver.spyOnDelete();

        await driver.deleteTaskAt(0);

        expect(driver.getTasksNum()).toEqual(0);
        expect(axiosDelete).toHaveBeenCalledWith("/todos/123");
    });

    it("should support check todo", async () => {
        await driver.create(testItems.oneItem);
        expect(driver.getTasksNum()).toEqual(1);
        const axiosPut = driver.spyOnPut();

        await driver.checkTaskAt(0, true);

        expect(driver.isFirstTaskChecked()).toEqual(true);
        expect(axiosPut).toHaveBeenCalledWith("/todos/123", { checked: true });
    });

    it("should support uncheck todo", async () => {
        await driver.create(testItems.oneItem);
        expect(driver.getTasksNum()).toEqual(1);
        const axiosPut = driver.spyOnPut();

        await driver.checkTaskAt(0, false);

        expect(driver.isFirstTaskChecked()).toEqual(false);
        expect(axiosPut).toHaveBeenCalledWith("/todos/123", { checked: false });
    });

    it('should support edit todo', async () => {
        await driver.create(testItems.oneItem);
        expect(driver.getTasksNum()).toEqual(1);
        const axiosPut = driver.spyOnPut();

        await driver.editTaskAt(0, "Edited Task");

        expect(driver.getTaskTitleAt(0)).toEqual("Edited Task");
        expect(axiosPut).toHaveBeenCalledWith("/todos/123", { title: "Edited Task" })
    })
    
});
