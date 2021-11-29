const mysql = require("mysql2");
const inquirer = require("inquirer");
const dotenv = require("dotenv");
const cTable = require("console.table");
dotenv.config();

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: process.env.DB_PW,
    database: "worklist_db",
  },
  console.log(`Connected to the worklist_db database.`)
);
db.connect((err) => {
  if (err) throw err;
  console.log("farts");
  allQuestions();
});

menu = [
  {
    type: "list",
    message: "Where Would You Like to Go?",
    name: "answer",
    choices: [
      "View All Departments",
      "View All Roles?",
      "View All Employees?",
      "Add a Department?",
      "Add a Role?",
      "Add an Employee?",
      "Update an Employee",
      "Exit the Database",
    ],
  },
];

const promptUser = () => {
  return inquirer.prompt(menu);
};

function allQuestions() {
  console.log("shit");
  promptUser().then((response) => {
    switch (response.answer) {
      case "View All Departments":
        viewAllDepartments();
        break;
      case "View All Roles?":
        viewAllRoles();
        break;
      case "View All Employees?":
        viewAllEmployees();
        break;
      case "Add a Department?":
        addNewDepartment();
        break;
      case "Add a Role?":
        addNewRole();
        break;
      case "Add an Employee?":
        addNewEmployee();
        break;
      case "Exit the Database":
        quit();
        break;
    }
  });
    function viewAllDepartments() {
      console.log("Here They Are");
      db.query(`SELECT * ​FROM department`, (err, results) => {
        if (err) {
          console.log({ error: err.message });
          return;
        }
        console.table(results);
        return allQuestions();
      });
    }

  function viewAllRoles () {
    console.log("Where They Are");
    db.query(`SELECT role_id FROM employee`, (err, results) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      console.table(results);
      return allQuestions();
    });
  }
  function viewAllEmployees () {
    console.log("Who Are They");
    db.query(`SELECT first_name, last_name ​FROM employee`, (err, results) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      console.table(results);
      return allQuestions();
    });
  }
  function addNewDepartment () {
    console.log("Add a new department meow");
    inquirer.prompt([
      {
          name: "name",
          message: "What is the name of the department?"
      }
  ]).then(input => {
      let name = input;
      db.query("INSERT INTO department (name) SET ?", [[name.name]], () => {
        allQuestions()
    })
})
}
  function addNewRole () {
    console.log("Add a new meow");
    inquirer.prompt([
      {
          name: "name",
          message: "What is the name of the role?"
      },
      {
          name: "salary",
          message: "What is the salary of the role?"
      },
      {
          name: "department_id",
          message: "What is the department id of the role?"
      }
  ]).then(input => {
      let title = input;
      console.log(title);
      db.query("INSERT INTO role (title, salary, department_id) VALUES ?", [[title.name, parseInt(title.salary), parseInt(title.department_id)]], () => {
          allQuestions()
      })
  })
}
  function addNewEmployee () {
    console.log("meowww meow meow");
    db.query(`SELECT first_name, last_name ​FROM employee`, (err, results) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      console.table(results);
      return allQuestions();
    });
  }
  function quit() {
    console.log("exiting...done.")
    process.exit();
}
}
