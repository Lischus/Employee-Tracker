const inquirer = require('inquirer')
const mysql2 = require('mysql2')
require('console.table')

const db = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '>3gDXa4e*EdsHN[-',
        database: 'workplace_db'
    },
    console.log(`Connected to the workplace_db database.`)
)

function menu() {
    //This is setting up the menu
    inquirer.prompt([{
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
    }]).then((results) => {
        let choices = results.choices
        switch (choices) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employees":
                addEmployee();
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
        }
    })
}

function viewAllEmployees() {
    const sql = `SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.table(rows)
            menu()
        }
    })
}

function viewAllDepartments() {
    const sql = `SELECT department.id, department.name FROM department`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.table(rows)
            menu()
        }
    })
}

function viewAllRoles() {
    const sql = `SELECT role.department_id, role.title, role.salary FROM role`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            console.table(rows)
            menu()
        }
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "newEmployeeFirstName",
        message: "What is the first name of your new employee?"
    },
    {
        type: "input",
        name: "newEmployeeLastName",
        message: "What is the last name of your new employee?"
    }]).then((answer) => {
        console.log(answer)
        let sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${answer.newEmployeeFirstName}", "${answer.newEmployeeLastName}", 1)`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Employee successfully added!")
                menu()
            }
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "newDepartment",
        message: "What's the title of your new department?"
    }]).then((answer) => {
        let sql = `INSERT INTO department (name) VALUES ("${answer.newDepartment}")`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Your department has been successfully added!");
                menu()
            }
        })
    })
}

function addRole() {
    inquirer.prompt([{
        type: "input",
        name: "roleName",
        message: "What's the name of your new role?"
    },
    {
        type: "input",
        name: "roleSalary",
        message: "What is the annual salary of this new role?"

    },
    {
        type: "input",
        name: "roleDepartment",
        message: "What department is this new roll in?"
    }]).then((answer) => {
        let checkQuery = `SELECT id FROM department WHERE name = "${answer.roleDepartment}"`
        db.query(checkQuery, (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                let sql = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleName}", "${answer.roleSalary}", "${rows[0].id}")`
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Your role has been successfully added!");
                        menu()
                    }
                })
            }
        })
    })
}

function updateEmployeeRole() {
    let roles = []
    function chooseRole() {
        db.query("SELECT * FROM role", (err, res) => {
            if (err) {
                console.log(err)
            } else {
                for (let i = 0; i < res.length; i++) {
                    roles.push(res[i].title);
                }
            }
        })
        return roles;
    }
    db.connect(function (err) {
        if (err) {
            console.log(err)
        } else {
            db.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id", (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    inquirer.prompt([{
                        type: "list",
                        message: "Which employee would you like to update?",
                        name: "updatedEmployee",
                        choices: function () {
                            let updatedEmployee = [];
                            for (let i = 0; i < res.length; i++) {
                                updatedEmployee.push(res[i].last_name);
                            }
                            return updatedEmployee;
                        }
                    },
                    {
                        type: "list",
                        message: "What role would you like them to have?",
                        name: "updatedRole",
                        choices: chooseRole()
                    }
                    ]).then(answer => {
                        db.query(`UPDATE employee SET role_id = ${chooseRole().indexOf(answer.updatedRole) + 1} WHERE last_name = "${answer.updatedEmployee}"`,
                            function (err) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log("Role successfully updated!")
                                    menu()
                                }
                            })
                    })
                }
            })
        }
    })
}

menu()