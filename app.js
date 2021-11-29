const mysql = require('mysql2');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
dotenv.config()

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.DB_PW,
      database: 'worklist_db'
    },
    console.log(`Connected to the worklist_db database.`)
  );
  db.connect (err => {
      if (err) throw err
      console.log("farts");
      allQuestions ()
  })
  // Query database
//   db.query('SELECT * FROM students', function (err, results) {
//     console.log(results);
//   });

  // function promptUser () {
  //     inquirer.prompt([
  //         {
  //             type: "list",
  //             message: "What do you want to do?",
  //             name: "option",
  //             choices: [ 
  //               "view all departments",
  //               "view all roles",
  //               "view all employees", 
  //               "add a department", 
  //               "add a role", 
  //               "add an employee", 
  //               "update an employee role"]
  //         }
  //     ]) .then (function(data){
  //       console.log(data)
  //     })
  // }

  menu = [
    {
        type: 'rawlist',
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
            "Exit the Database"
        ]
    },
];

const promptUser = () => {
    return inquirer.prompt(menu)
}

  function allQuestions () {
    console.log("shit")
    promptUser ()
      .then (({ answer }) => {
        switch (answer) {
            case "view all departments":
              viewAllDepartments();
  }

  function viewAllDepartments () {
    console.log("All Departments")
    allQuestions ()
  }

  function createDepartment() {
    console.log("Create New Department")
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }
    ]).then(input => {
        let name = input;
        connection.promise().query("INSERT INTO department SET ?", name)
            .then(() => console.log(`Added ${name.name} to the database`))
            .then(() => promptUser())
    })
}

function viewAllRoles () {
  console.log("All Roles")
  connection.promise().query("SELECT id, name FROM role;")
      .then(result => {
          console.table(result[0]);
          promptUser();
      })
}

function createRole() {
  console.log("Create New Role")
  inquirer.prompt([
      {
          name: "name",
          message: "What is the name of the role?"
      }
  ]).then(input => {
      let name = input;
      connection.promise().query("INSERT INTO role SET ?", name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => promptUser())
  })
}
})}
