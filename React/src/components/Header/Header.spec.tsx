import { headerDriver } from "./Header.driver";

describe("Testing <Header />", () => {

    it("Should render single title", () => {
        const driver = headerDriver();

        expect(driver.isTitlePresent()).toEqual(true);
    });
});
