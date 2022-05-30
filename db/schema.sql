DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;



/* Notice the id is created in the department table BUT then it is passed to role using the FOREIGN KEY*/
CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT PRIMARY KEY ,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NULL,
    manager_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE SET NULL,
    FOREIGN key (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);



/*
NEXT STEPS 
SEEDS -> REMEMBER TO USE INSERT INTO(REFERENCE TABLE NAME THAT APPLIES)
   -establish the values for each table
   -reference u-develop-it

SERVER 

INQUIRER- 
  -create function for each inquirer selection available (add,delete,update)
*/