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

    // it("Should show todos list", async () => {
    //     expect(await driver.isSingleTodoListExists()).toEqual(true);
    // });

    // it("Should show single task with buttons and checkbox", async () => {
    //     expect(await driver.isCheckboxExists()).toEqual(true);
    //     expect(await driver.isDeleteBtnExists()).toEqual(true);
    //     expect(await driver.isEditBtnExists()).toEqual(true);
    // });

    it('should support adding new task', async () => {
        await driver.addTask("Testing");

        expect(await driver.getFirstTaskTitle()).toEqual("Testing")
    })
    
});
