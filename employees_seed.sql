DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
	id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id),
    CONSTRAINT fk_department
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY(id),
    CONSTRAINT fk_role
    FOREIGN KEY (role_id) REFERENCES role(id),
    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

/* SEED CODE */
INSERT INTO department VALUES 
(NULL,"Marketing"),
(NULL,"Sales"),
(NULL,"R&D"),
(NULL,"Customer Relations"),
(NULL,"Executive");

INSERT INTO role VALUES 
(NULL,"Marketeer",50000,1),
(NULL,"Public Relations Officer",80000,1),
(NULL,"Sales Representative",30000,2),
(NULL,"Engineer",100000,3),
(NULL,"Tester",50000,3),
(NULL,"Customer Service Rep",20000,4),
(NULL,"CEO",1000000,5);

INSERT INTO employee VALUES 
(NULL,"Laverne","Verdant",7,NULL),
(NULL,"Ru","LaRue",1,1),
(NULL,"Millie","Aves",2,1),
(NULL,"Mai","Manager",4,1),
(NULL,"Mai","Engineer",4,4),
(NULL,"Mai","Intern",4,4),
(NULL,"Mai","Tester",5,4),
(NULL,"Scott","DeScott",2,1),
(NULL,"Jane","Janet",6,1);


/* SELECT CODE */
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;