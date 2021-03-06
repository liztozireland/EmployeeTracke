INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");
INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Sales Person", 70000, 1),
    ("Lead Engineer", 100000, 2),
    ("Junior Engineer", 70000, 2),
    ("Account Manager", 100000, 3),
    ("Accountant", 80000, 3),
    ("Legal Team Lead", 100000, 4),
    ("Lawyer", 100000, 4);
    
 INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id)
 VALUES
    ("Mark", "Mothersbaugh", 1, NULL, 1),
    ("Bob", "Mothersbaugh", 2, 1, 1),
    ("Gerald", "Casale", 3, NULL, 2),
    ("Bob", "Casale", 4, 3, 2),
    ("Wendy", "OWilliams", 5, NULL, 3),
    ("Siouxsie", "Sioux", 6, 5, 3),
    ("Gaye", "Advert", 7, NULL, 4),
    ("Joe", "Strummer", 8, 7, 4);