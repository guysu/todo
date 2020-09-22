import { appDriver, AppDriver } from "./App.driver";

describe("Testing <App /> using Jest", () => {
    let driver: AppDriver;

    beforeEach(async () => {
        driver = await appDriver();
    });

    it("Should render one <Header />", async () => {
        expect(driver.countHeaderNum()).toEqual(1);
    });

    it("Should render one <TodoList />", async () => {
        expect(driver.countTodoListNum()).toEqual(1);
    });
});
