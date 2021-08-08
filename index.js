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
let manSection = ``
let engSection = ``
let intSection = ``


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
    writeFileAsync('index.html', generateHTML()).then()
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
const storeEngineer = (answers) => {
  const currentEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
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
  engineerList.push(currentEngineer)
}
const storeIntern = (answers) => {
  const currentIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
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
  internList.push(currentIntern)
}

// function testfunc(){
//   engineerList.forEach(element => {
    
//   });

//   `
//   <div class="card" style="width: 18rem;">
//     <div class="card-body">
//       <h5 class="card-title">${engineerList[i].name}</h5>
//       <h6 class="card-subtitle mb-2 text-muted">${engineerList[i].getRole()}</h6>
//       <div class="card" style="width: 18rem;">
//     <ul class="list-group list-group-flush">
//       <li class="list-group-item">ID Number: TEST</li>
//       <li class="list-group-item">TEST</li>
//       <li class="list-group-item">TEST</li>
//     </ul>
//   </div>
//     </div>
//   </div>
//       `;
//   }



//   }
  // writeFileAsync('index.html', generateHTML())


init();

// const init = () => {
//   promptUser()
//     .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
//     .then(() => console.log('Successfully wrote to index.html'))
//     .catch((err) => console.error(err));
// };

// init();