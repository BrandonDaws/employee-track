INSERT INTO department(name) 
VALUES ("Sales"), 
("Customer Service"), 
("Engineering"), 
("Service Dept");

INSERT INTO roles (title, salary, department_id)
 VALUES ("Service Dept Manager", 90000, 4),
 ("Engineering Manager", 110000, 3),
  ("Sales Manager", 90000, 1), 
   ("Customer Service Manager", 75000, 2), 
 ("Salesman", 85000, 1), 
 ("Customer Rep", 50000, 2), 
 ("Service Tech", 60000, 3), 
 ("Engineer", 100000, 3),
 ("Technician", 70000, 4), 
 ("Lead Technician", 80000, 4), 
 ("Lead Customer Rep", 60000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("brandon", "daws", 1),
("rachyl", "ban", 2),
("peter", "park", 3);
