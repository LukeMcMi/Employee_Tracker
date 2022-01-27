const inquirer = require("inquirer");
const connection = require('./db/connection.js')
const questions = require('./db/questions.js')
const table = require("console.table");
const logo = require("asciiart-logo");

displayLogo()
start();

function displayLogo() {
    console.log(
        logo({
            name: 'Employee Tracker',
            lineChars: 10,
            padding: 2,
            margin: 3,
            borderColor: 'white',
            logoColor: 'white',
            textColor: 'white',
        })
        .render()
    );
}

async function start() {
    const userChoice = await inquirer.prompt(questions.initialQuestion);
    switch (userChoice.initial) {
        case "Add Employee":
            addEmployee();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "View Departments":
            printDepartments();
            break;
        case "View Employees":
            printEmployees();
            break;
        case "Update Employee's Role":
            updateRole();
            break;
        case "Remove Employee":
            rmEmployee();
            break;
        case "View All Roles":
            printRoles();
            break;
        case "Remove Roles":
            rmRole();
            break;
        case "Exit":
            connection.end();
            break;
    }

}

async function addEmployee() {
    let qry = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee"
    connection.query(qry, async (err, employees) => {
        qry = "SELECT id as value, title as name FROM roles"
        connection.query(qry, async (err, roles) => {
            const newEmp = await inquirer.prompt(questions.addEmployee(roles, employees));
            qry = "INSERT INTO employee SET ?"
            connection.query(qry, newEmp, function (err) {
                if (err) throw err;
                console.log("New employee was added successfully!");
                start();
            });
        })
    })
}

async function addDepartment() {
    const departmentDetails = await inquirer.prompt(questions.addDepartment)
    connection.query("INSERT INTO department SET ?", {
            department_name: departmentDetails.department_name
        },
        function (err) {
            if (err) throw err;
            console.log("New department was added successfully!");
            start();
        }
    );
}

async function addRole() {
    const roleDetails = await inquirer.prompt(questions.addRole);
    connection.query("INSERT INTO roles SET ?", {
            title: roleDetails.title,
            salary: roleDetails.salary
        },
        function (err) {
            if (err) throw err;
            console.log("New role was added successfully!");
            start();
        }
    );
}

async function updateRole() {
    connection.query("SELECT * FROM employee", async (err, employee) => {
        const {
            worker,
            newrole
        } = await inquirer.prompt([{
                type: "list",
                message: "Choose an employee to update:",
                name: "worker",
                choices: () => {
                    return employee.map((employee) => employee.last_name);
                },
            },
            {
                type: "list",
                message: "What is this employee's new role?",
                name: "newrole",
                choices: () => {
                    return employee.map((employee) => employee.role_id);
                }
            }
        ]);
        connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{
                    role_id: newrole,
                },
                {
                    last_name: worker,
                },
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " products updated!\n");
                console.table(employee);
                start();
            }
        );
    })
}

function printDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}
function printEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function printRoles() {
    connection.query("SELECT title FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function rmEmployee() {
    connection.query("SELECT * FROM employee", async (err, employee) => {
        const {
            employeeName
        } = await inquirer.prompt([{
            type: "list",
            message: "Select an employee to delete:",
            name: "employeeName",
            choices: () => {
                return employee.map((employee) => `${employee.last_name}`);
            }
        }]);
        connection.query(`DELETE FROM employee WHERE ?`, {
                last_name: employeeName
            },
            function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            });
    })
}

