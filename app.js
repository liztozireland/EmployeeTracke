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
      "Exit the Database",
    ],
  },
];

const promptUser = () => {
  return inquirer.prompt(menu);
};

function allQuestions() {
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
      db.query('SELECT * FROM department', (err, results) => {
        if (err) {
          console.log({ error: err.message });
          return;
        }
        console.table(results);
        return allQuestions();
      });
    }

  function viewAllRoles () {
    db.query(`SELECT * FROM role`, (err, results) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      console.table(results);
      return allQuestions();
    });
  }
  function viewAllEmployees () {
    db.query(`SELECT * FROM employee`, (err, results) => {
      if (err) {
        console.log({ error: err.message });
        return;
      }
      console.table(results);
      return allQuestions();
    });
  }
  function addNewDepartment () {
    inquirer.prompt([
      {
          name: "name",
          message: "What is the name of the department?"
      }
  ]).then(input => {
      let name = input;
      db.query(`INSERT INTO department SET ?`, name, (err, res) => {
        if (err) throw err;
        console.log(res)
        console.log(name)
        allQuestions()
    })
})
}
  function addNewRole () {
    inquirer.prompt([
      {
          name: "name",
          message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
    }
  ]).then(input => {
      let name = input;
      console.log(name);
      db.query('INSERT INTO role (title, salary) VALUES ?', [[name.name, parseInt(name.salary)]], (err, res) => {
          if (err) throw err;
          console.log(res)
          console.log(name)
          allQuestions()
      })
  })
}
  function addNewEmployee () {
    inquirer.prompt([
      {
          name: "name",
          message: "What is the employee's first name?"
      },
      {
          name: "last",
          message: "What is the employee's last name?"
      },
      {
          name: "role_id",
          message: "What is the employee's role id?"
      },
      {
          name: "manager_id",
          message: "What is the employee's manager id?"
      }
  ]).then(input => {
      let name = input;
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?`, [[name.name, name.last, parseInt(name.role_id), parseInt(name.manager_id)]], (err, res) => {
        if (err) throw err;
        console.log(res)
        console.log(name)
        allQuestions()
      })
  })
}
  function quit() {
    console.log("exiting...done.")
    process.exit();
}
}
