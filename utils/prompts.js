const Employee = require("../interface_objects/employee");
const Department = require("../interface_objects/department");
const Role = require("../interface_objects/role");

async function inquireDepartment(ask,defaults) {
  const departmentResponse = await ask.prompt([
    {
      message:"Enter department's name: ",
      name: "name",
      type: "input",
      default: defaults["Name"]
    }
  ]);
  return new Department(departmentResponse.name);
}

async function inquireRole(ask,departments,defaults) {
  const departmentChoices = inquirefyDepartments(departments);
  const defaultDepartmentIndex = idToIndex(departments,defaults["Department ID"]);
  const roleResponse = await ask.prompt([
    {
      message: "Enter role's title: ",
      name: "title",
      type: "input",
      default: defaults["Title"]
    },
    {
      message: "Enter role's salary: ",
      name: "salary",
      type: "input",
      default: defaults["Salary"]
    },
    {
      message: "Select role's department: ",
      name: "departmentID",
      type: "list",
      choices: departmentChoices,
      default: defaultDepartmentIndex
    }
  ]);

  return new Role(roleResponse.title,roleResponse.salary,roleResponse.departmentID);
}

async function inquireEmployee(ask,roles,managers,defaults) {
  const roleChoices = inquirefyRoles(roles);
  const managerChoices = inquirefyEmployees(managers);

  let default_role_index;
  if (defaults["Role ID"]) {
    default_role_index = idToIndex(roles,defaults["Role ID"]);
  }
  
  let default_manager_index;
  if (defaults["Manager ID"]) {
    default_manager_index = idToIndex(managers,defaults["Manager ID"]);
  }

  const employeeResponse = await ask.prompt([
    {
      message: "Enter employee's first name: ",
      name: "firstName",
      type: "input",
      default: defaults['First Name']
    },
    {
      message: "Enter employee's last name: ",
      name: "lastName",
      type: "input",
      default: defaults['Last Name']
    },
    {
      message: "Select employee's role: ",
      name: "roleID",
      type: "list",
      choices: roleChoices,
      default: default_role_index
    },
    {
      message: "Select employee's manager: ",
      name: "managerID",
      type: "list",
      choices: managerChoices,
      default: default_manager_index
    }
  ]);
  return new Employee(employeeResponse.firstName,employeeResponse.lastName,employeeResponse.roleID,employeeResponse.managerID);
}

async function inquireExistingEmployee(ask,employees) {
  const employeeChoices = inquirefyEmployees(employees);
  const {existingEmployeeID} = await ask.prompt([
    {
      message: "Select an existing employee",
      name: "existingEmployeeID",
      type: "list",
      choices: employeeChoices
    }
  ]);
  const [existingEmployee] = employees.filter(value => value.ID === existingEmployeeID);
  return existingEmployee;
}

async function inquireExistingDepartment(ask,departments) {
  const departmentChoices = inquirefyDepartments(departments);
  const {existingDepartmentID} = await ask.prompt([
    {
      message: "Select an existing department",
      name: "existingDepartmentID",
      type: "list",
      choices: departmentChoices
    }
  ]);
  return departments[idToIndex(departments,parseInt(existingDepartmentID))];
}

async function inquireExistingRole(ask,roles) {
  const roleChoices = inquirefyRoles(roles);
  const {existingRoleID} = await ask.prompt([
    {
      message: "Select an existing role",
      name: "existingRoleID",
      type: "list",
      choices: roleChoices
    }
  ]);
  const [existingRole] = roles.filter(value => value.ID === existingRoleID);
  return existingRole;
}

function idToIndex(objects,id) {
  for (let index = 0; index < objects.length; index++) {
    if (objects[index]['ID'] === id) {
      return index;
    }
  }
  return -1;
}

function inquirefyEmployees(employees) {
  return employees.map(employee => {
    return {
      "name":`${employee["First Name"]} ${employee["Last Name"]} (${employee["Role"]})`,
      "value": employee.ID,
      "short": `${employee["First Name"]} ${employee["Last Name"]}`
    };
  });
}

function inquirefyRoles(roles) {
  return roles.map(role => {
    return {
      "name": `${role["Title"]}[${role["ID"]}]`,
      "value": role["ID"],
      "short": role["Title"]
    }
  });
}

function inquirefyDepartments(departments) {
  return departments.map(department => {
    return {
      "name": `${department.Name}`,
      "value": `${department.ID}`,
      "short": `${department.Name}`
    }
  });
}

module.exports = {
  inquireEmployee,
  inquireDepartment,
  inquireRole,
  inquireExistingEmployee,
  inquireExistingDepartment,
  inquireExistingRole
}