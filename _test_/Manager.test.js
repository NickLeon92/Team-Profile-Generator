const Manager = require("../lib/Manager");

describe("Manager class",() => {
    describe("getOfficeNumber method", () => {
        it("should return manager office number", () => {
            const testManager = new Manager("Phil","13", "phil@phil.com", "2");
            expect(testManager.getOfficeNumber()).toBe("2")
        })
    })
})