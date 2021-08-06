const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
// const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const managerList = []
const engineerList = []
const internList = []


// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

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

const Menu = () => {
  return inquirer.prompt(
    {
      type: 'list',
      message: 'Add more employees or finish?',
      name: 'menuChoice',
      choices: ['Engineer', 'Intern', 'Finish Team'],
  }
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
  if (answers.menuChoice === 'Finish Team'){
    testfunc()
  }
})
}

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

const generateHTML = (answers) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;

// Bonus using writeFileAsync as a promise
const init = () => {
  ManagerForm()
    .then((answers) => {
      Menu()
      storeManager(answers)})
    .catch((err) => console.error(err));
};
const storeManager = (answers) => {
  const currentManager = new Manager(answers.name, answers.id, answers.email, answers.officenumber)
  managerList.push(currentManager)
}
const storeEngineer = (answers) => {
  const currentEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
  engineerList.push(currentEngineer)
}
const storeIntern = (answers) => {
  const currentIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
  internList.push(currentIntern)
}

function testfunc(){
  console.log(managerList)
  console.log(engineerList)
  console.log(internList)
}

init();

// const init = () => {
//   promptUser()
//     .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
//     .then(() => console.log('Successfully wrote to index.html'))
//     .catch((err) => console.error(err));
// };

// init();