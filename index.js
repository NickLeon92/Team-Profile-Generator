const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
// const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');

const managerList = []


// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
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
    promptUser().then((answers) => {
      Menu()
      storeManager(answers)})
    .catch((err) => console.error(err))
  }
})
}

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
  promptUser()
    .then((answers) => {
      Menu()
      storeManager(answers)})
    .catch((err) => console.error(err));
};
const storeManager = (answers) => {
  const currentManager = new Manager(answers.name, answers.id, answers.email, answers.officenumber)
  managerList.push(currentManager)
  console.log(managerList)
}

init();

// const init = () => {
//   promptUser()
//     .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
//     .then(() => console.log('Successfully wrote to index.html'))
//     .catch((err) => console.error(err));
// };

// init();