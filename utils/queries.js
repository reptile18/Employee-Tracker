const mysql = require("promise-mysql");

class Query {
  constructor(connection) {
    this.connection = connection;
  }
}

// query strings
const getAllEmployeesQuery = `
SELECT emp.id as 'ID', emp.first_name as 'First Name', emp.last_name as 'Last Name', role.id as 'Role ID', role.title as 'Role', mgr.id as 'Manager ID', mgr.first_name as 'Manager First Name',mgr.last_name as 'Manager Last Name' FROM employee emp
LEFT JOIN employee mgr
ON emp.manager_id = mgr.id
INNER JOIN role 
ON emp.role_id = role.id`;
const getAllDepartmentsQuery = `SELECT department.id as 'ID', department.name as 'Name' FROM department`;
const getAllRolesQuery = `
SELECT role.id as 'ID', role.title as 'Title', role.salary as 'Salary', department.id as 'Department ID', department.name as 'Department' FROM role
INNER JOIN department
on role.department_id = department.id;`;
const addEmployeeQuery = `INSERT INTO employee SET ?`;
const addDepartmentQuery = `INSERT INTO department SET ?`;
const addRoleQuery = `INSERT INTO role SET ?`;
const updateEmployeeQuery = `UPDATE employee SET ? WHERE id = ? `
const updateDepartmentQuery = `UPDATE department SET ? WHERE id = ?`
const updateRoleQuery = `UPDATE role SET ? WHERE id = ?`
const deleteEmployeeQuery = `DELETE FROM employee WHERE id = ?`;
const deleteDepartmentQuery = `DELETE FROM department WHERE id = ?`;
const deleteRoleQuery = `DELETE FROM role WHERE id = ?`;
const getTotalUtilizedBudgetQuery = `
SELECT SUM(salary) FROM employee 
INNER JOIN role
ON role.id = employee.role_id;`;
const getEmployeesByManagerQuery = `
SELECT emp.id as 'ID', emp.first_name as 'First Name', emp.last_name as 'Last Name', role.id as 'Role ID', role.title as 'Role', mgr.id as 'Manager ID', mgr.first_name as 'Manager First Name',mgr.last_name as 'Manager Last Name' FROM employee emp
LEFT JOIN employee mgr
ON emp.manager_id = mgr.id
INNER JOIN role 
ON emp.role_id = role.id 
WHERE emp.manager_id = ?`

// external functions
Query.prototype.getAllEmployees = async function () {
 return await this.connection.query(getAllEmployeesQuery);
}

Query.prototype.getAllDepartments = async function () {
  return await this.connection.query(getAllDepartmentsQuery);
}

Query.prototype.getAllRoles = async function () {
  return await this.connection.query(getAllRolesQuery);
}

Query.prototype.getEmployeesByManager = async function(manager) {
  return await this.connection.query(getEmployeesByManagerQuery,[manager.ID]);
}

Query.prototype.getTotalUtilizedBudget = async function() {
  return await this.connection.query(getTotalUtilizedBudgetQuery);
}

Query.prototype.addEmployee = async function (employee) {
  try {
    const outcome = await this.connection.query(addEmployeeQuery,employee);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.addDepartment = async function(department) {
  try {
    const outcome = await this.connection.query(addDepartmentQuery,department);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.addRole = async function(role) {
  try {
    const outcome = await this.connection.query(addRoleQuery,role);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.updateEmployee = async function(employee) {
  try {
    const outcome = await this.connection.query(updateEmployeeQuery,[employee,employee.id]);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.updateDepartment = async function(department) {
  try {
    const outcome = await this.connection.query(updateDepartmentQuery,[department,department.id]);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.updateRole = async function(role) {
  try {
    const outcome = await this.connection.query(updateRoleQuery,[role,role.id]);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.deleteEmployee = async function(employee) {
  try {
    const outcome = await this.connection.query(deleteEmployeeQuery,[employee.ID]);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.deleteDepartment = async function(department) {
  try {
    const outcome = await this.connection.query(deleteDepartmentQuery,[department.ID]);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.deleteRole = async function(role) {
  try {
    const outcome = await this.connection.query(deleteRoleQuery,[role.ID]);
    return outcome.constructor.name === "OkPacket";
  }
  catch (err) {
    this.printErrorMessageForCode(err);
    return false;
  }
}

Query.prototype.printErrorMessageForCode = function (error) {
  console.log("\x1b[31m");
  switch (error.errno) {
    case 1406:
      console.log("Data provided is too long for the column.");
      break;
    case 1451:
      console.log("Can't delete or update. Existing data references this object.");
      break;
    case 1452: 
      console.log("Can't add or update. New object references non-existent objects.")
    default:
      console.log(error);
      break;
  }
  console.log("\x1b[0m");
}

module.exports = Query;