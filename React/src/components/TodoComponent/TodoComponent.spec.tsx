import {todoComponentDriver, TodoComponentDriver} from './TodoComponent.driver'

describe("Testing <TodoComponent />", () => {

	let driver: TodoComponentDriver;

	beforeEach(() => {
		driver = todoComponentDriver({task: {id:"123", title: "Testing", checked: false}});
	})

	it("Should render checkbox", () => {
		expect(driver.isCheckboxExists()).toEqual(true);
	})

	it("Should render title", () => {
		expect(driver.getTaskTitle()).toEqual("Testing")
	})

	it("Should render edit button", () => {
		expect(driver.isEditBtnExists()).toEqual(true);
	})

	it("Should render delete button", () => {
		expect(driver.isDeleteBtnExists()).toEqual(true);
	})
})