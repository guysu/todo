import { todoEditModeDriver, TodoEditModeDriver } from "./TodoEditMode.driver";


describe("Testing <TodoEditMode />", () => {

    let driver: TodoEditModeDriver;

    beforeEach(() => {
        driver = todoEditModeDriver("Testing", () => {});
    })

    it("Should render input with given value", () => {
        expect(driver.getInputVal()).toEqual("Testing");
    });

    it("Should render save button", () => {
        expect(driver.checkSaveBtnExist()).toEqual(true);
    });
});
