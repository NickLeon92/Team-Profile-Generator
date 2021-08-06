const Intern = require("../lib/Intern");

describe("Intern class",() => {
    describe("getSchool method", () => {
        it("should return employee name", () => {
            const testIntern = new Intern("Phil","13", "phil@phil.com", "Harvard");
            expect(testIntern.getSchool()).toBe("Harvard")
        })
    })
})