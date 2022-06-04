const { type } = require('express/lib/response');
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
            type: 'input',
            name: 'dept',
            message: 'what is the name of the department?'
        }
    ]).then(answer => {
        const sql = "INSERT INTO department (name) VALUES (?)";

        db.query(sql, answer.dept , (err,res) =>{
            if (err) throw (err);
            console.log("You've added a new department");
            db.query("SELECT * FROM department",(err,res) => {
                console.table(res);
                if(err) throw (err);
                startPrompt();
        });
        
        });
    });
};


function addRole() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is the roles title?'
        },
        {
            type: 'input',
            name: 'sal',
            message: 'What is this roles salary?'
        }
    ])
    .then(answers => {
        //Get list of departments
       const params = [answers.title, answers.sal];

       const getDept = `SELECT name, id FROM department`;

       db.query(getDept, (err, data) => {
           if (err) throw (err);
           const depart = data.map(({ name, id }) => ({ name: name, value: id }));

           inquirer.prompt([
               {
                   type: 'list',
                   name: 'depart',
                   message: 'Which department is this role under?',
                   choices: depart
               }
           ])
           .then(departmentChoice => {
               //Add new department
               const depart = departmentChoice.depart;
               params.push(depart);

               const sql = `INSERT INTO roles (title, salary, department_id)
                            VALUES (?,?,?)`;

                db.query(sql, params, (err, res) => {
                    if (err) throw (err);
                    console.log("Role added!");
                    allRoles();
                });
           });
       });
    });
};

function addEmployee() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'first',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last',
            message: "What is the employee's last name?"
        }
    ])
    .then(answers => {
        //get list of roles
       const params = [answers.first, answers.last];

       const getRole = `SELECT roles.id, roles.title FROM roles`;

       db.query(getRole, (err, data) => {
           if (err) throw (err);
           const role = data.map(({ id, title }) => ({ name: title, value: id }));

           inquirer.prompt([
               {
                   type: 'list',
                   name: 'role',
                   message: "What is the employee's role?",
                   choices: role
               }
           ])
           .then(roleCreate => {
               //get list of managers
               const role = roleCreate.role;
               params.push(role);

               const managerSql = `SELECT * FROM employee`;

               db.query(managerSql, (err, data) => {
                    if (err) throw (err);
                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: managers
                        }
                    ])
                    .then(managerChoice => {
                        //Add employee
                        const manager = managerChoice.manager;
                        params.push(manager);

                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?,?,?,?)`;

                        db.query(sql, params, (err, res) => {
                            if (err) throw (err);
                            console.log('Employee has been added to database.')
                            allEmployees();
                        });
                    });
           });
       });
    });
});
};


module.exports = startPrompt;