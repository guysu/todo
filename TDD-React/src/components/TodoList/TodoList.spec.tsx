import { todoListDriver, TodoListDriver } from "./TodoList.driver";

describe("Testing <TodoList />", () => {
    let driver: TodoListDriver;

    beforeEach(() => {
        driver = todoListDriver();
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
		driver.addTaskWithInput("Testing");

		expect(driver.getTasksNum()).toEqual(1);
        expect(driver.getTaskTitleAt(0)).toEqual("Testing");
    });
});
