const inquirer = require('inquirer');
const db = require('./db/connection');

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


const allDepartments = () => {
    const sql = 'SELECT * FROM department'

    db.query(sql, (err, res) => {
        console.table(res);
        if (err) throw err;

        inquirer.prompt({
            name: 'endOfInitialPrompt',
            type: 'list',
            message: 'Would you like to exit the program or return to the main menu?',
            choices: [
                'Return to main menu',
                'Exit the program'
            ]
        }).then(({ endOfInitialPrompt }) => {
            if (endOfInitialPrompt === 'Return to main menu') {
                startPrompt();
            } if (endOfInitialPrompt === 'Exit the program') {
                db.end();
            }
        })
    });
};

const allRoles = () => {
    const sql = 'SELECT * FROM roles'

    db.query(sql, (err, res) => {
        console.table(res);
        if (err) throw err;

        inquirer.prompt({
            name: 'endOfInitialPrompt',
            type: 'list',
            message: 'Would you like to exit the program or return to the main menu?',
            choices: [
                'Return to main menu',
                'Exit the program'
            ]
        }).then(({ endOfInitialPrompt }) => {
            if (endOfInitialPrompt === 'Return to main menu') {
                startPrompt();
            } if (endOfInitialPrompt === 'Exit the program') {
                db.end();
            }
        })
    });
};


const allEmployees = () => {
    const sql = 'SELECT * FROM employee'

    db.query(sql, (err, res) => {
        console.table(res);
        if (err) throw err;

        inquirer.prompt({
            name: 'endOfInitialPrompt',
            type: 'list',
            message: 'Would you like to exit the program or return to the main menu?',
            choices: [
                'Return to main menu',
                'Exit the program'
            ]
        }).then(({ endOfInitialPrompt }) => {
            if (endOfInitialPrompt === 'Return to main menu') {
                startPrompt();
            } if (endOfInitialPrompt === 'Exit the program') {
                db.end();
            }
        })
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'what is the name of the department?'
        }
    ])
    .then(({newDepartment}) => {
        db.query("INSERT INTO department(name) SET ?",
        {
            department_names: newDepartment
        },
        );
        console.log("You've added a new department");
        db.query("SELECT * FROM department",(err,res) => {
            console.table(res);
            startPrompt();
        })
    });
};


module.exports = startPrompt;