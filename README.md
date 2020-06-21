# Employee Tracker

![Employee Tracker GIF Walkthrough](test.gif)

## Table of Contents
- [Employee Tracker](#employee-tracker)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Front End](#front-end)
    - [Back End](#back-end)
  - [Launch](#launch)
  - [Usage](#usage)
  - [Testing](#testing)
  - [Author](#author)

## Installation

### Front End
After cloning the repository, type:
```
npm install
```
to install all dependencies

### Back End
On a MySQL Server, create the schema and tables using the MySQL script [installation.sql](./database_files/installation.sql)

## Launch

To start the express server, type:
```
npm start
```
or
```
node ./index.js
```

## Usage

This project is a lightweight employee manager that prompts the user for actions and performs queries and transactions against a MySQL database. The MySQL database stores employee, department, and role information for the application. The available actions are:
* View all employees,
* View employees by manager,
* View all departments,
* View all roles,
* View total utilized budget,
* Add employee,
* Add department,
* Add role,
* Update employee,
* Update department,
* Update role,
* Delete employee,
* Delete department,
* Delete role

View the provided video above for more information on each of these actions.

## Testing 
For a set of test objects to start with, run [employees_seed.sql](./database_files/employees_seed.sql)

## Author

* **Johnny Li** - *Initial work* - [reptile18](https://github.com/reptile18)
