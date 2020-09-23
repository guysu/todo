import { appDriver, AppDriver } from "./App.driver";

describe("Testing <App/>", () => {
    let driver: AppDriver;

    beforeEach(async () => {
        driver = appDriver();
    });

    it("Should show title", async () => {
        expect(driver.getTitleText()).toEqual("Welcome To The TDD Todo List!");
	});
	
	it("Should show todos list", async () => {
		expect(driver.isSingleTodoListExists()).toEqual(true);
	});
});
