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

describe("Testing <TodoList />", () => {
    let driver: TodoListDriver;

    beforeEach(async () => {
        driver = await todoListDriver();
    });

    it("Should render empty list", async () => {
        await driver.create(testItems.noItems);

        expect(driver.countTasksNum()).toBe(0);
    });

    it("Should render list with one task", async () => {
        await driver.create(testItems.oneItem);

        expect(driver.countTasksNum()).toBe(1);
    });

    it("Should render one <TodoComponent /> after delete", async () => {
        await driver.create(testItems.twoItems);
        expect(driver.countTasksNum()).toBe(2);

        await driver.deleteTaskAt(0);

        expect(driver.countTasksNum()).toBe(1);
    });

    it("Should support edit and save", async () => {
        await driver.create(testItems.oneItem);
        expect(driver.countTasksNum()).toBe(1);

        await driver.enterEditModeAt(0);
        await driver.changeTitleAndSaveAt("Edited Task", 0);

        expect(driver.getTaskTitleAt(0)).toEqual("Edited Task");
    });

    it("Should show one checked task", async () => {
        await driver.create(testItems.oneItemChecked);

        expect(driver.countFinishedTasksNum()).toBe(1);
    });

    it("Should support checking checkbox", async () => {
        await driver.create(testItems.oneItem);
        expect(driver.countTasksNum()).toBe(1);

        await driver.checkTaskAt(0);

        expect(driver.countFinishedTasksNum()).toBe(1);
    });

    it("Should support unchecking checkbox", async () => {
        await driver.create(testItems.oneItemChecked);
        expect(driver.countTasksNum()).toBe(1);

        await driver.checkTaskAt(0);

        expect(driver.countFinishedTasksNum()).toBe(0);
    });

    it("Should support adding task", async () => {
        await driver.create(testItems.noItems);
        expect(driver.countFinishedTasksNum()).toBe(0);

        await driver.addTask("Testing");

        expect(driver.countTasksNum()).toBe(1);
    });
});

describe("Test call of axios functions to server", () => {
    let driver: TodoListDriver;

    beforeEach(async () => {
        driver = await todoListDriver();
    });

    afterEach(() => {
        driver.close();
    });

    it("Should delete on DB after click on delete", async () => {
        await driver.create(testItems.oneItemChecked);
        const axiosDeleteDB = driver.spyOnAxiosDelete();

        await driver.deleteTaskAt(0);

        expect(axiosDeleteDB).toHaveBeenCalledWith("/todos/123");
    });

    it("Should edit on DB after checking", async () => {
        await driver.create(testItems.oneItemChecked);
        const axiosEditDB = driver.spyOnAxiosPut();

        await driver.checkTaskAt(0);

        expect(axiosEditDB).toHaveBeenCalledWith("/todos/123", { checked: true });
    });

    it("Should edit on DB after edit title", async () => {
        await driver.create(testItems.oneItemChecked);
        const axiosEditDB = driver.spyOnAxiosPut();

        await driver.enterEditModeAt(0);
        await driver.changeTitleAndSaveAt("Edited Task", 0);

        expect(axiosEditDB).toHaveBeenCalledWith("/todos/123", { title: "Edited Task" });
    });

    it("Should add task on DB when adding task", async () => {
        await driver.create(testItems.noItems);
        const axiosAddDB = driver.spyOnAxiosPost();

        await driver.addTask("Test");

        expect(axiosAddDB).toHaveBeenCalledWith("/todos", {
            title: "Test",
            checked: false,
        });
    });
});
