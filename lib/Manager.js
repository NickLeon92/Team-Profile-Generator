const Employee = require('./Employee');

class Manager extends Employee{

    constructor(name, id, email, officeNumber){
        super(name, id, email, officeNumber)
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return 'Manager';
    }
}

const testpls = new Manager ("hitler","1","hitler@hitler.com","2")
console.log(testpls)
console.log(testpls.getRole())
console.log(testpls.getName())
console.log(testpls.email)



module.exports = Manager;