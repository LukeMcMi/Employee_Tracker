const inquirer = require("inquirer");
const connection = require('./db/connection.js')
const questions = require('./db/questions.js')
const table = require("console.table");

start();

async function start() {
    const userChoice = await inquirer.prompt(questions.initialQuestion);
    switch (userChoice.initial) {
        case "Add an employee":
            addEmployee();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addNewRole();
            break;
        case "View departments":
            printDepartments();
            break;
        case "View employees":
            printEmployees();
            break;
        case "Update employee role":
            updateRole();
            break;
        case "View all employees by manager":
            employeesByManager();
            break;
        case "Remove employee":
            rmEmployee();
            break;
        case "View all employees by department":
            employeesByDepartment();
            break;
        case "View all roles":
            printRoles();
            break;
        case "Remove roles":
            rmRole();
            break;
        case "Quit":
            connection.end();
            break;
        default:
            connection.end();
    }
}