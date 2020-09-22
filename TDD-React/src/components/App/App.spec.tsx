import { appDriver, AppDriver } from "./App.driver";

describe("Testing <App/>", () => {
    let driver: AppDriver;

    beforeEach(async () => {
        driver = appDriver();
    });

    it("Should render single <Header />", async () => {
        expect(driver.isSingleHeaderExists()).toEqual(true);
	});
	
	it("Should render single <TodoList />", async () => {
		expect(driver.isSingleTodoListExists()).toEqual(true);
	})
});
