const Engineer = require("../lib/Engineer");

describe("Engineer class",() => {
    describe("getGitHub method", () => {
        it("should return employee GitHub", () => {
            const testEngineer = new Engineer("Phil","13", "phil@phil.com", "PhilHub");
            expect(testEngineer.getGitHub()).toBe("PhilHub")
        })
    })
})