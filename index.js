const inquirer = require('inquirer');
const mysql2 = require('mysql2');
require('console.table')

const db = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '>3gDXa4e*EdsHN[-',
        database: 'workplace_db'
      },
      console.log(`Connected to the workplace_db database.`)
    );

function menu() {
    //This is setting up the menu
    inquirer.prompt([{
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    }]).then((results) => {
        let choices = results.choices
        switch (choices) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employees":
                addEmployees();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Quit":
                quit();
                break;
        }
    })
}

function viewAllEmployees() {
    const sql = `SELECT employee.id, employee.first_name, eployee.last_name,`
}

function viewAllDepartments() {
    const sql = `SELECT department.id, department.name FROM department`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log("Ya screwed up, kid.")
        } else {
            console.table(rows)
            menu()
        }
    })
}

function viewAllRoles() {

}

function addEmployee() {

}

function addDepartment() {
    const
}

function addRole() {
    const 
    //find all the departments first then grab all the choices
}

function updateEmployeeRole() {
    viewAllEmployees()
    inquirer.prompt([{

    }])
    
    const sql = `UPDATE `
    const params = ``

    db.query(sql, params, (err, result) => {
        if (err) {

        }
    })
}

function quit() {

}

menu();