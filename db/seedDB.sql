INSERT into
  department (department_name)
VALUES
  ('Executive'),
  ('Sales'),
  ('Finance'),
  ('Legal'),
  ('Marketing'),
  ('IT'),
  ('HR');
  
  
INSERT into
  roles (title, salary, department_id)
VALUES ('President', 500000, 1),
('CEO', 350000, 1),
('COO', 350000, 1),
('CFO', 350000, 1),
('Executive VP', 350000, 1),
  ('HR Director', 350000, 1),
  ('Sales Director', 200000, 1),
  ('Marketing Director', 200000, 1),
  ('General Counsel', 200000, 1),
  ('Executive Assistant', 95000, 1),
  ('Sales Director', 95000, 2),
  ('Sales Manager', 95000, 2),
  ('Salesperson', 550000, 2),
  ('Sales Assistant', 45000, 2),
  ('Lead Architect', 150000, 3),
  ("Tech Consultant", 85000, 3),
  ("Computer Programmer", 30000, 3),
  ('Lawyer', 140000, 4),
  ('Legal Assistant', 55000, 4),
  ('Accountant', 120000, 5),
  ('HR Manager', 130000, 6),
  ('Marketing Manager', 130000, 7),
  ('Marketing Assistant', 40000, 7),
  ('Secretary', 550000, 7);
  
  
INSERT into
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Scott", "Smith", 1, 1),
  ("Mary", "Williams", 2, 1),
  ("Michael", "Streep", 3, 1),
  ("Paul", "Myers", 4, 1),
  ("Jade", "Kruger", 5, 1),
  ("Fred", "Bramble", 5, 1),
  ("William", "Johnson", 6, 1),
  ("Cleo", "Morisson", 6, 1),
  ("Nate", "Jones", 7, 1),
  ("Brian", "Simons", 8, 2),
  ("Anthony", "Trump", 9, 2),
  ("Fez", "Merillo", 10, 2),
  ("Prasan", "King", 10, 2),
  ("John", "Blanchette", 11, 2),
  ("Walter", "Blunt", 12, 2),
  ("Larry", "Garland", 13, 2),
  ("George", "Sinatra", 14, 3),
  ("Anne", "Irons", 15, 3),
  ("Kara", "Depp", 16, 3),
  ("Dani", "Reeves", 16, 3),
  ("Philip", "Kidder", 17, 3),
  ("Lacy", "Ford", 18, 3),
  ("Jen", "Daniels", 19, 3),
  ("Rick", "Nicks", 19, 3);
Select
  employee.first_name,
  employee.last_name,
  roles.title,
  roles.salary,
  department.department_name,
  employee_m.first_name as manager_firstname,
  employee_m.last_name as manager_lastname
from
  employee
  join roles on employee.role_id = roles.id
  join department on roles.department_id = department.id
  Left join employee as employee_m on employee.manager_id = employee_m.id;
select
  *
from
  department;
select
  *
from
  roles;
select
  *
from
  employee;