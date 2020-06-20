const mysql = require("promise-mysql");

class Query {
  constructor(connection) {
    this.connection = connection;
  }
}

// query strings
const getAllEmployeesQuery = `
SELECT emp.id as 'ID', emp.first_name as 'First Name', emp.last_name as 'Last Name', role.title as 'Role',mgr.first_name as 'Manager First Name',mgr.last_name as 'Manager Last Name' FROM employee emp
LEFT JOIN employee mgr
ON emp.manager_id = mgr.id
INNER JOIN role 
ON emp.role_id = role.id`;
const getAllDepartmentsQuery = `SELECT department.id as 'ID', department.name as 'Name' FROM department`;
const getAllRolesQuery = `
SELECT role.id as 'ID', role.title as 'Title', role.salary as 'Salary', department.name as 'Department' FROM role
INNER JOIN department
on role.department_id = department.id;`;
const addEmployeeQuery = `INSERT INTO employee SET ?`;
const addDepartmentQuery = `INSERT INTO department SET ?`;
const addRoleQuery = `INSERT INTO role SET ?`;
const updateEmployeeQuery = `UPDATE employee SET ? WHERE id = ? `
const updateDepartmentQuery = `UPDATE department SET ? WHERE id = ?`
const updateRoleQuery = `UPDATE role SET ? WHERE id = ?`
// raw
const getAllEmployeesQueryRaw = 'select * from employee';
const getAllRolesQueryRaw = 'select * from role'

// external functions
Query.prototype.getAllEmployees = async function () {
 return await this.connection.query(getAllEmployeesQuery);
}

Query.prototype.getAllEmployeesRaw = async function() {
  return await this.connection.query(getAllEmployeesQueryRaw);
}

Query.prototype.getAllDepartments = async function () {
  return await this.connection.query(getAllDepartmentsQuery);
}

Query.prototype.getAllRoles = async function () {
  return await this.connection.query(getAllRolesQuery);
}

Query.prototype.getAllRolesRaw = async function() {
  return await this.connection.query(getAllRolesQueryRaw);
}

Query.prototype.addEmployee = async function (employee) {
  try {
    const outcome = await this.connection.query(addEmployeeQuery,employee);
    return outcome.constructor.name === "OkPacket";
  }
  catch {
    return false;
  }
}

Query.prototype.addDepartment = async function(department) {
  try {
    const outcome = await this.connection.query(addDepartmentQuery,department);
    return outcome.constructor.name === "OkPacket";
  }
  catch {
    return false;
  }
}

Query.prototype.addRole = async function(role) {
  try {
    const outcome = await this.connection.query(addRoleQuery,role);
    return outcome.constructor.name === "OkPacket";
  }
  catch {
    return false;
  }
}

Query.prototype.updateEmployee = async function(employee) {
  try {
    const outcome = await this.connection.query(updateEmployeeQuery,[employee,employee.id]);
    return outcome.constructor.name === "OkPacket";
  }
  catch {
    return false;
  }
}

Query.prototype.updateDepartment = async function(department) {
  try {
    const outcome = await this.connection.query(updateDepartmentQuery,[department,department.id]);
    return outcome.constructor.name === "OkPacket";
  }
  catch {
    return false;
  }
}

Query.prototype.updateRole = async function(role) {
  try {
    const outcome = await this.connection.query(updateRoleQuery,[role,role.id]);
    return outcome.constructor.name === "OkPacket";
  }
  catch {
    return false;
  }
}

module.exports = Query;