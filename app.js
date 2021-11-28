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
  })
  // Query database
//   db.query('SELECT * FROM students', function (err, results) {
//     console.log(results);
//   });

  function promptUser () {
      inquirer.prompt([
          {
              type: "list",
              message: "What do you want to do?",
              name: "option",
              choices: [ 
                "view all departments",
                "view all roles",
                "view all employees", 
                "add a department", 
                "add a role", 
                "add an employee", 
                "update an employee role"]
          }
      ]) .then (function(data){
        console.log(data)
      })
  }

  function viewAllDepartments () {
    console.log("All Departments")
    connection.promise().query("SELECT id, name FROM department;")
        .then(result => {
            console.table(result[0]);
            mainMenu();
        })
  }

  function allQuestions () {
    promptUser()
    
  }
  allQuestions ();