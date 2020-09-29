import { appE2EDriver, AppE2EDriver } from "./app.e2e.driver";

describe("Testing Todo E2E", () => {
    let driver: AppE2EDriver;

    beforeEach(async () => {
        driver = await appE2EDriver();
    });

    afterEach(async () => {
        await driver.close();
    });

    it("Should show title", async () => {
        expect(await driver.getTitleText()).toEqual("Welcome To The TDD Todo List!");
    });

    it("should support adding new task", async () => {
        await driver.addTask("Testing");

        await driver.waitForChangesToApply();

        expect(await driver.getFirstTaskTitle()).toEqual("Testing");
    });

    it("should support deleting task", async () => {
        await driver.addTask("Testing");
        await driver.waitForChangesToApply();
        expect(await driver.getTasksNum()).toEqual(1);

        await driver.deleteFirstTask();
        await driver.waitForChangesToApply();

        expect(await driver.getTasksNum()).toEqual(0);
    });

    it("should support checking task", async () => {
        await driver.addTask("Testing");
        await driver.waitForChangesToApply();
        expect(await driver.getTasksNum()).toEqual(1);

        await driver.checkFirstTask();
        await driver.waitForChangesToApply();

        expect(await driver.isFirstTaskChecked()).toEqual(true);
    });

    it("should support editing task", async () => {
        await driver.addTask("Testing");
        await driver.waitForChangesToApply();
        expect(await driver.getFirstTaskTitle()).toEqual("Testing");

        await driver.editFirstTask("Edited Task");
        await driver.waitForChangesToApply();

        expect(await driver.getFirstTaskTitle()).toEqual("Edited Task");
    });
});
