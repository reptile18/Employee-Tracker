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