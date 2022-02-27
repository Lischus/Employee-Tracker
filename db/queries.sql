-- DELETE FROM department WHERE id >4;
-- DELETE FROM role WHERE id >8;
-- DELETE FROM employee WHERE id >8;

-- ALTER TABLE department AUTO_INCREMENT=1;
-- ALTER TABLE role AUTO_INCREMENT=1;
-- ALTER TABLE employee AUTO_INCREMENT=1;
USE workplace_db;

SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id;