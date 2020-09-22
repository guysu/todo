import { appE2EDriver, AppE2EDriver } from "./App.e2e.driver";

describe("Testing <App /> using Puppeteer", () => {
    let driver: AppE2EDriver;

    beforeEach(async () => {
        driver = await appE2EDriver();
    });

    afterEach(async () => {
        await driver.close();
    });

    it("Should render one task after adding", async () => {
        expect(await driver.getFirstTaskTitle()).not.toEqual("Testing");
        await driver.addTask("Testing");
        await driver.waitForChangesToApply();

        const titleText = await driver.getFirstTaskTitle();

        expect(titleText).toEqual("Testing");
    });

    it("Should render zero tasks after adding and deleting", async () => {
        await driver.addTask("Testing");
        await driver.waitForChangesToApply();
        expect(await driver.countTasksNum()).toEqual(1);

        await driver.deleteFirstTask();
        await driver.waitForChangesToApply();

        expect(await driver.countTasksNum()).toEqual(0);
    });
});
