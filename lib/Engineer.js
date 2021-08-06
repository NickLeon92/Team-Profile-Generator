const Employee = require('./Employee');

class Engineer extends Employee{

    constructor(name, id, email, gitHub){
        super(name, id, email, gitHub)
        this.gitHub = gitHub;
    }
    getGitHub() {
        return this.gitHub;
    }
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;