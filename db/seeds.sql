USE employee_tracker_db;

INSERT INTO department(name) 
VALUES ("Sales"), 
("Customer Service"), 
("Engineering"), 
("Service Dept");

INSERT INTO role (title, salary, department_id)
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
 ("Lead Customer Rep", 60000, 2)



 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ("brandon", "Dawson", 1, NULL ),
 ("Victor", "lujan", 2, NULL ),
 ("Tony", "Tran", 3, NULL),
("Vincent", "thomas", 4, NULL),
("Pat", "Mahomes", 5, 3 ),
("Peter", "Park", 6, 4),
("Katy", "Spanks", 7, 1),
("julio", "ernesto", 6, 4)
