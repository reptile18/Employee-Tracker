// modules
const inquirer = require("inquirer");
const mysql = require("promise-mysql");
const table = require("console.table");
// files
const Query = require("./utils/queries");
const prompts = require("./utils/prompts");

// entry
main();

// code
async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Password1.,",
    database: "employees_db"
  });
  const query = new Query(connection);

  printTitle();
  const {option} = await inquirer.prompt([
    {
      message: "What would you like to do?",
      name: "option",
      type: "list",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee",
        "Update department",
        "Update role",
        "Delete employee",
        "Delete department",
        "Delete role",
        "Exit"
      ]
    }
  ]);
  console.log(`\n`);
  switch(option) {
    case "View all employees":
      const employees = await query.getAllEmployees();
      console.table(employees);
      break;
    case "View all departments":
      const departments = await query.getAllDepartments();
      console.table(departments);
      break;
    case "View all roles":
      const roles = await query.getAllRoles();
      console.table(roles);
      break;
    case "Add employee":
      const employeeroles = await query.getAllRoles();
      const managers = await query.getAllEmployees();

      const employee = await prompts.inquireEmployee(inquirer,employeeroles,managers,emptyEmployee());
      if (await query.addEmployee(employee)) {
        console.log(`Employee ${employee.first_name} ${employee.last_name} added successfully.`)
      }
      else {
        console.log(`Employee add failed.`);
      }
      break;
    case "Add department":
      const department = await prompts.inquireDepartment(inquirer,emptyDepartment());
      if (await query.addDepartment(department)) {
        console.log(`Department ${department.name} added successfully.`)
      }
      else {
        console.log(`Department add failed.`);
      }
      break;
    case "Add role":
      const roleDepartments = await query.getAllDepartments();
      const role = await prompts.inquireRole(inquirer,roleDepartments,emptyRole)
      if (await query.addRole(role)) {
        console.log(`Role ${role.title} added successfully.`)
      }
      else {
        console.log(`Role add failed.`);
      }
      break;
    case "Update employee":
      const existingEmployees = await query.getAllEmployees();
      const existingEmployee = await prompts.inquireExistingEmployee(inquirer,existingEmployees);
      const existingEmployeeRoles = await query.getAllRoles();
      const existingEmployeeManagers = await query.getAllEmployees();
      const updatedEmployee = await prompts.inquireEmployee(inquirer,existingEmployeeRoles,existingEmployeeManagers,existingEmployee);
      updatedEmployee.id = existingEmployee.ID;
      console.log(existingEmployee);
      console.log(updatedEmployee);
      if (await query.updateEmployee(updatedEmployee)) {
        console.log(`Employee ${updatedEmployee.first_name} ${updatedEmployee.last_name} update successfully`);
      }
      else {
        console.log("Employee update failed.");
      }
      break;
    case "Update department":
      const existingDepartments = await query.getAllDepartments();
      const existingDepartment = await prompts.inquireExistingDepartment(inquirer,existingDepartments);
      const updatedDepartment = await prompts.inquireDepartment(inquirer,existingDepartment);
      updatedDepartment.id = existingDepartment.ID;

      if (await query.updateDepartment(updatedDepartment)) {
        console.log(`Department successfully renamed to ${updatedDepartment.name}`);
      }
      else {
        console.log("Department update failed");
      }
      break;
    case "Update role":
      const existingRoles = await query.getAllRoles();
      const existingRole = await prompts.inquireExistingRole(inquirer,existingRoles);
      const existingRoleDepartments = await query.getAllDepartments();
      const updatedRole = await prompts.inquireRole(inquirer,existingRoleDepartments,existingRole);
      updatedRole.id = existingRole.ID;
      if (await query.updateRole(updatedRole)) {
        console.log(`Role ${updatedRole.title} successfully updated`);
      }
      else {
        console.log("Role update failed");
      }

      break;
    case "Delete employee":
      const existingEmployeesToDelete = await query.getAllEmployees();
      const existingEmployeeToDelete = await prompts.inquireExistingEmployee(inquirer,existingEmployeesToDelete);
      if (await query.deleteEmployee(existingEmployeeToDelete)) {
        console.log(`Employee ${existingEmployeeToDelete["First Name"]} ${existingEmployeeToDelete["Last Name"]} deleted.`)
      }
      else {
        console.log("Employee deletion failed");
      }
      break;
    case "Delete department":
      const existingDepartmentsToDelete = await query.getAllDepartments();
      const existingDepartmentToDelete = await prompts.inquireExistingDepartment(inquirer,existingDepartmentsToDelete);
      if (await query.deleteDepartment(existingDepartmentToDelete)) {
        console.log(`Department ${existingDepartmentToDelete["Name"]} deleted.`);
      }
      else {
        console.log("Department deletion failed");
      }
      break;
    case "Delete role":
      const existingRolesToDelete = await query.getAllRoles();
      const existingRoleToDelete = await prompts.inquireExistingRole(inquirer,existingRolesToDelete);
      if (await query.deleteRole(existingRoleToDelete)) {
        console.log(`Role ${existingRoleToDelete["Title"]} deleted`);
      }
      else {
        console.log("Role deletion failed");
      }
      break;
    case "Exit":
      connection.end();
      break;
  }
  await inquirer.prompt([
    {
      message: 'Press enter to continue.',
      name: 'throwaway'
    }
  ])
  main();
}

function emptyEmployee() {
  return {'id': null,'first_name': null,'last_name': null,"role_id": null,"manager_id": null};
}

function emptyDepartment() {
  return {'ID': null,"Name": null};
}

function emptyRole() {
  return {"id": null, "title": null, "salary": null, "department_id": null};
}

async function printTitle() {
  // to do: print jumbotron 
  console.log("Employee Manager");
}