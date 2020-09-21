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
        await driver.addTask("Testing");

        const titleText = await driver.getFirstTaskTitle();

        expect(titleText).toEqual("Testing");
    });

    it("Should render zero tasks after adding and deleting", async () => {
        await driver.addTask("Testing");
        await driver.deleteFirstTask();

        expect(await driver.isTaskExists()).toEqual(false);
    });
});
