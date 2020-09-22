import { idText } from "typescript";
import { appE2EDriver, AppE2EDriver } from "./app.e2e.driver";

describe("Testing Todo E2E", () => {
    let driver: AppE2EDriver;

    beforeEach(async () => {
        driver = await appE2EDriver();
    });

    afterEach(async () => {
        await driver.close();
    });

    it("Should render <Header />", async () => {
        expect(await driver.isSingleHeaderExists()).toEqual(true);
    });

    it("Should renser <TodoList />", async () => {
        expect(await driver.isSingleTodoListExists()).toEqual(true);
    })
});
