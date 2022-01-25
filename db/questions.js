module.exports = {
    initialQuestion: {
        type: "list",
        message: "What would you like to do?",
        name: "initial",
        choices: ["Add Employee",
            "Add Department",
            "Add Role",
            "View Departments",
            "View Employees",
            "Update Employee's Role",
            "View All Employees by Manager",
            "Remove Employee",
            "View All Employees by Ddepartment",
            "View All Roles",
            "Add a Role",
            "Remove Roles",
            "Exit"
        ]
    },
    addEmployee: (roles, employees) => [{
        type: "input",
        message: "What is your employee's first name?",
        name: "first_name",
    },
    {
        type: "input",
        message: "What is your employee's last name?",
        name: "last_name",
    },
    {
        type: "list",
        message: "What is your employee's roleID?",
        name: "role_id",
        choices: roles
    },
    {
        type: "list",
        message: "Who is your employee's manager?",
        name: "manager_id",
        choices: employees
    }
    ],
}