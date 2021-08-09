//import relevant libraries
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

//initialize data storage
const managerList = []
const engineerList = []
const internList = []
//initialize html content
let manSection = ``
let engSection = ``
let intSection = ``

//initializes file writting when called
const writeFileAsync = util.promisify(fs.writeFile);

//initial form to record manager data
const ManagerForm = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please Enter Manager Name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Please Enter Manager ID Number:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please Enter Manager Email:',
    },
    {
      type: 'input',
      name: 'officenumber',
      message: 'Please Enter Manager Office Number:',
    },
  ]);
};
//initializes menu prompt
const Menu = () => {
  return inquirer.prompt(
    {
      type: 'list',
      message: 'Add more employees or finish?',
      name: 'menuChoice',
      choices: ['Engineer', 'Intern', 'Finish Team'],
  }

  //once selected, the code navigates you to the selected fillout form
).then((answers) => {
  if (answers.menuChoice === 'Engineer') {
    EngineerForm()
      .then((answers) => {
        Menu()
        storeEngineer(answers)})
    .catch((err) => console.error(err))
  }
  if (answers.menuChoice === 'Intern') {
    InternForm()
      .then((answers) => {
        Menu()
        storeIntern(answers)})
    .catch((err) => console.error(err))
  }
  //if finished, the file writting function is called
  if (answers.menuChoice === 'Finish Team'){
    writeFileAsync('index.html', generateHTML()).then()
  }
})
}
//returns series of prompts for engineer entries
const EngineerForm = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please Enter Engineer Name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Please Enter Engineer ID Number:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please Enter Engineer Email:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Please Enter Engineer GitHub User ID:',
    },
  ]);
};
//returns series of prompts for intern entries
const InternForm = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please Enter Intern Name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Please Enter Intern ID Number:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please Enter Intern Email:',
    },
    {
      type: 'input',
      name: 'school',
      message: 'Please Enter Intern Office School:',
    },
  ]);
};
//this lays the structure of the html
const generateHTML = () =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"> 
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="./style.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">THE TEAM</h1>
  </div>
  </div>

  <h1>Managers<h1>

  <div class = "mySection">
  ${manSection}
  </div>

  <h1>Engineers<h1>

  <div class = "mySection">
  ${engSection}
  </div>

  <h1>Interns<h1>

  <div class = "mySection">
  ${intSection}
  </div>

</body>
</html>`;

//initializer function
const init = () => {
  //application begins with answering manager questions
  ManagerForm()
    .then((answers) => {
      //menu function called
      Menu()
      //data handler function stores the data from the manager questions
      storeManager(answers)})
    .catch((err) => console.error(err));
};

//handler function for manager data
const storeManager = (answers) => {
  //creates new member of manager class
  const currentManager = new Manager(answers.name, answers.id, answers.email, answers.officenumber)
  //creates html section for manager
  manSection = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${currentManager.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${currentManager.getRole()}</h6>
      <div style="width: 100%;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID Number: ${currentManager.id}</li>
      <li class="list-group-item">Email: <a href="mailto:${currentManager.email}">${currentManager.email}</a></li>
      <li class="list-group-item">Office Number: ${currentManager.officeNumber}</li>
    </ul>
  </div>
    </div>
  </div>
      ` + manSection;
  managerList.push(currentManager)
}
//handler function for engineer data
const storeEngineer = (answers) => {
  //creates new member of engineer class
  const currentEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
  //creates html section for engineers and appends the section every time a new entry is added
  engSection = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${currentEngineer.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${currentEngineer.getRole()}</h6>
      <div style="width: 100%;">
    <ul class="list-group list-group-flush">
    <li class="list-group-item">ID Number: ${currentEngineer.id}</li>
    <li class="list-group-item">Email: <a href="mailto:${currentEngineer.email}">${currentEngineer.email}</a></li>
    <li class="list-group-item">GitHub: <a href="https://github.com/${currentEngineer.gitHub}">${currentEngineer.gitHub}</a></li>
    </ul>
  </div>
    </div>
  </div>
      ` + engSection;
      //creates running list of engineers
  engineerList.push(currentEngineer)
}
//handler function for intern data
const storeIntern = (answers) => {
  //creates new member of intern class
  const currentIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
  //creates html section for intern and appends the section every time a new entry is added
  intSection = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${currentIntern.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${currentIntern.getRole()}</h6>
      <div style="width: 100%;">
    <ul class="list-group list-group-flush">
    <li class="list-group-item">ID Number: ${currentIntern.id}</li>
    <li class="list-group-item">Email: <a href="mailto:${currentIntern.email}">${currentIntern.email}</a></li>
    <li class="list-group-item">School: ${currentIntern.school}</li>
    </ul>
  </div>
    </div>
  </div>
      ` + intSection;
      //creates running list of interns
  internList.push(currentIntern)
}
//initialize application
init();