USE workplace_db;

SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id;