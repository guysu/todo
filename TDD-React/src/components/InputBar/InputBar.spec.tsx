import {inputBarDriver, InputBarDriver} from './InputBar.driver'

describe('Testing <InputBat />', () => {
	
	let driver: InputBarDriver;

	beforeEach(() => {
		driver = inputBarDriver()
	})	

	it('should clear input value after clicking on add btn', () => {
		expect(driver.getInputValue()).toEqual('');

		driver.insertTaskTitle("Testing");
		expect(driver.getInputValue()).toEqual("Testing")

		driver.clickAddBtn();
		expect(driver.getInputValue()).toEqual('');
	})

	it('should support adding task with enter btn', () => {
		expect(driver.getInputValue()).toEqual('');

		driver.insertTaskTitle("Testing");
		expect(driver.getInputValue()).toEqual("Testing")

		driver.pressEnter();
		expect(driver.getInputValue()).toEqual('');
	})
	
	
})
