const Employee = require("../lib/Employee");

describe("Employee class",() => {
    describe("getName method", () => {
        it("should return employee name", () => {
            const testEmployee = new Employee("Phil","13","phil@phil.com");
            expect(testEmployee.getName()).toBe("Phil")
        });
    });
});