import { todoComponentDriver, TodoComponentDriver } from "./TodoComponent.driver";

describe("Testing <TodoComponent />", () => {
    let driver: TodoComponentDriver;

    beforeEach(() => {
        driver = todoComponentDriver();
    });

    it("should have checkbox", async () => {
        expect(await driver.isCheckboxExists()).toEqual(true);
    });

    it("should have delete button", async () => {
        expect(await driver.isDeleteBtnExists()).toEqual(true);
    });

    it("should have edit button", async () => {
        expect(await driver.isEditBtnExists()).toEqual(true);
    });

    it('should enter edit mode when clicking edit btn', () => {
        driver.enterEditMode();

        expect(driver.isInEditMode()).toEqual(true);
    })
    
});
