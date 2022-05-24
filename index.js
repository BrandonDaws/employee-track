const inquirer = require('inquirer');


startPrompt = function () {
    inquirer.prompt({
        name: 'initialPrompt',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee role',
            'Exit'
        ]
    })
        .then(({ initialPrompt }) => {
            if (initialPrompt === 'View all departments') {
                allDepartments();
            }
            if (initialPrompt === 'View all roles') {
                allRoles();
            }
            if (initialPrompt === 'View all employees') {
                allEmployees();
            }
            if (initialPrompt === 'Add a department') {
                addDepartment();
            }
            if (initialPrompt === 'Add a role') {
                addRole();
            }
            if (initialPrompt === 'Add an employee') {
                addEmployee();
            }
            if (initialPrompt === 'Update employee role') {
                updateRole();
            }
            if (initialPrompt === 'Exit') {
 // the “db.end()” comes from the variable you use to connect to your db. Not sure what you called it.
                db.end();
            }
        });
}; 
