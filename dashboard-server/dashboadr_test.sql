delete FROM "Profile";
delete FROM "Company";
delete FROM "Department";
delete FROM "Credential";

select "id", "name" from "Credential";

SELECT * FROM "Profile";
SELECT * FROM "Company";
SELECT * FROM "Department";
SELECT * FROM "Credential";

-- Вставка данных в таблицу "Company" (1)
INSERT INTO "Company" (id, name, "createdAt")
VALUES
    (gen_random_uuid(),'Company 1', NOW());

INSERT INTO "Company" (id, name, "createdAt")
VALUES
    (gen_random_uuid(),'Company 1', NOW(), '5badc34e-c227-44a2-88f6-c7cd25d160cd');


-- Вставка данных в таблицу "Company" (2)
INSERT INTO "Company" (id, name, "createdAt")
VALUES
    (gen_random_uuid(),'Company 2', NOW());

-- Вставка данных в таблицу "Company" (3)
INSERT INTO "Company" (id, name, "createdAt")
VALUES
    (gen_random_uuid(),'Company 3', NOW());

-- Вставка данных в таблицу "Company" (4)
INSERT INTO "Company" (id, name, "createdAt")
VALUES
    (gen_random_uuid(),'Company 4', NOW(), '27da57e6-f81f-4322-9e77-cd12b3b11a78');

-- Вставка данных в таблицу "Company" (5)
INSERT INTO "Company" (id, name, "createdAt")
VALUES
    (gen_random_uuid(),'Company 5', NOW(), '9f26ecef-4a12-41b8-a988-929b189d1f2a');

-- Вставка данных в таблицу "Company" (7)
INSERT INTO "Company" (id, name, "createdAt")
VALUES
    (gen_random_uuid(),'Company 7', NOW(), '24a1d84c-b692-4d73-b470-4ab7e81cc86c');

-- Вставка данных в таблицу "Company" (8)
INSERT INTO "Company" (id, name, "createdAt")
VALUES
    (gen_random_uuid(),'Company 8', NOW(), '8290a330-415d-4c19-8883-dd972e083073');

-- Вставка данных в таблицу "Department" (1)
INSERT INTO "Department" (id, name, description, "createdAt")
VALUES
    (gen_random_uuid(),'Legal', 'Legal "Department"', NOW());

---DEPARTMENTS---
-- Вставка данных в таблицу "Department" (8)
INSERT INTO "Department" (id, name, description, "createdAt")
VALUES
    (gen_random_uuid(),'HR', 'Human Resources', NOW());

-- Вставка данных в таблицу "Department" (2)
INSERT INTO "Department" (id, name, description, "createdAt", "companyId")

VALUES
    (gen_random_uuid(),'IT', 'Information Technology', NOW(), 'a8ab361e-da11-4e33-95b9-c5d7d39fc601');

-- Вставка данных в таблицу "Department" (3)
INSERT INTO "Department" (id, name, description, "createdAt", "companyId")
VALUES
    (gen_random_uuid(),'Sales', 'Sales "Department"', NOW(), '503b342d-1c84-4320-b3fd-8026f5d477b2');

-- Вставка данных в таблицу "Department" (4)
INSERT INTO "Department" (id, name, description, "createdAt", "companyId")
VALUES
    (gen_random_uuid(),'Marketing', 'Marketing "Department"', NOW(), '40aaf559-bd02-4600-b8f5-c101fa49a059');

-- Вставка данных в таблицу "Department" (5)
INSERT INTO "Department" (id, name, description, "createdAt")
VALUES
    (gen_random_uuid(),'Finance', 'Finance "Department"', NOW());

-- Вставка данных в таблицу "Department" (6)
INSERT INTO "Department" (id, name, description, "createdAt")
VALUES
    (gen_random_uuid(),'Engineering', 'Engineering "Department"', NOW());

-- Вставка данных в таблицу "Department" (7)
INSERT INTO "Department" (id, name, description, "createdAt")
VALUES
    (gen_random_uuid(),'Support', 'Customer Support', NOW());

---CREDENTIAL---
-- Вставка данных в таблицу "Credential" (1)
INSERT INTO "Credential" (id,name, lastname, password)
VALUES
    (gen_random_uuid(),'John', 'Doe', 'qwerty');

-- Вставка данных в таблицу "Credential" (2)
INSERT INTO "Credential" (id,name, lastname, password)
VALUES
    (gen_random_uuid(),'Alice', 'Smith', 'qwerty');

-- Вставка данных в таблицу "Credential" (3)
INSERT INTO "Credential" (id,name, lastname, password)
VALUES
    (gen_random_uuid(),'Bob', 'Johnson', 'qwerty');

-- Вставка данных в таблицу "Credential" (4)
INSERT INTO "Credential" (id,name, lastname, password)
VALUES
    (gen_random_uuid(),'Emma', 'Davis', 'qwerty');

-- Вставка данных в таблицу "Credential" (5)
INSERT INTO "Credential" (id,name, lastname, password)
VALUES
    (gen_random_uuid(),'Michael', 'Wilson', 'qwerty');

-- Вставка данных в таблицу "Credential" (6)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES
    (gen_random_uuid(),'Olivia', 'Anderson', 'qwerty');

-- Вставка данных в таблицу "Credential" (7)
INSERT INTO "Credential" (id,name, lastname, password)
VALUES
    (gen_random_uuid(),'James', 'Martin', 'qwerty');

-- Вставка данных в таблицу "Credential" (8)
INSERT INTO "Credential" (id,name, lastname, password)
VALUES
    (gen_random_uuid(),'Sophia', 'Taylor', 'qwerty');

-- Вставка данных в таблицу Profile (1)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(),'0155c735-be2b-4c11-b479-afca6703de6d', 'a8ab361e-da11-4e33-95b9-c5d7d39fc601', '776e5dcf-aea1-458a-917d-10ab82c195e5', 'john.doe@company1.com', 'HR Manager', true);

-- Вставка данных в таблицу Profile (2)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), '4eca0614-fc84-4aa7-b557-73a964ba7051', '503b342d-1c84-4320-b3fd-8026f5d477b2', '69ed1553-3230-4afc-beab-c475cfc6e2f7', 'alice.smith@company2.com', 'IT Specialist', false);

-- Вставка данных в таблицу Profile (3)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), '2fe043d1-a20f-444a-82e4-dcb1232194d9', '40aaf559-bd02-4600-b8f5-c101fa49a059', '61222fb2-af42-4c3c-88f1-cf95e3056b7f', 'bob.johnson@company3.com', 'Sales Representative', false);

-- Вставка данных в таблицу Profile (4)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), 'ec8af01c-1647-40af-abf8-dc95ef1d4b6e', '3d0c348b-9985-4479-a80e-5d0f01e95cc1', '27da57e6-f81f-4322-9e77-cd12b3b11a78', 'emma.davis@company4.com', 'Marketing Coordinator', true);

-- Вставка данных в таблицу Profile (5)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), '0d430308-2be3-427c-aa64-003a53b48e03', '1203afe7-ad9a-4016-9364-b4a0692dc1f1', '9f26ecef-4a12-41b8-a988-929b189d1f2a', 'michael.wilson@company5.com', 'Financial Analyst', false);

-- Вставка данных в таблицу Profile (6)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), '74557624-d38a-4e6e-9203-09579b6bf4c9', '3b2fab69-1a2c-4597-8f0f-90882ec5c8d4', '3699899b-ec3f-4efb-b0cc-c5ea47520669', 'olivia.anderson@company6.com', 'Software Engineer', false);

-- Вставка данных в таблицу Profile (7)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), '867ccb7d-2cf5-423f-9f9c-471e6f075c1b', 'a55a85d9-5c5d-4733-910c-18e5e13f0134', '27da57e6-f81f-4322-9e77-cd12b3b11a78', 'james.martin@company7.com', 'Customer Support Agent', false);

-- Вставка данных в таблицу Profile (8)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), '47e55bfa-9209-4511-84ae-84382852db1a', '6eb55fab-5629-4c4e-ae27-75ec1f599516', '24a1d84c-b692-4d73-b470-4ab7e81cc86c', 'sophia.taylor@company8.com', 'Legal Counsel', true);



-----

-- Вставка данных в таблицу Credentials (9)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES (gen_random_uuid(), 'Ella', 'Brown', 'qwerty');

-- Вставка данных в таблицу Credentials (10)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES (gen_random_uuid(), 'Liam', 'Smith', 'qwerty');

-- Вставка данных в таблицу Credentials (11)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES (gen_random_uuid(), 'Ava', 'Johnson', 'qwerty');

-- Вставка данных в таблицу Credentials (12)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES (gen_random_uuid(), 'Noah', 'Davis', 'qwerty');

-- Вставка данных в таблицу Credentials (13)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES (gen_random_uuid(), 'Mia', 'Wilson', 'qwerty');

-- Вставка данных в таблицу Credentials (14)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES (gen_random_uuid(), 'Oliver', 'Anderson', 'qwerty');

-- Вставка данных в таблицу Credentials (15)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES (gen_random_uuid(), 'Charlotte', 'Martin', 'qwerty');

-- Вставка данных в таблицу Credentials (16)
INSERT INTO "Credential" (id, name, lastname, password)
VALUES (gen_random_uuid(), 'William', 'Taylor', 'qwerty');


-- Вставка данных в таблицу Profile (9)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), (SELECT id FROM "Credential" WHERE name = 'Ella' AND lastname = 'Brown'), 'Company 1', 'Sales', 'ella.brown@company1.com', 'HR Specialist', false);

-- Вставка данных в таблицу Profile (10)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), (SELECT id FROM "Credential" WHERE name = 'Liam' AND lastname = 'Smith'), 'Company 1', 'Sales', 'liam.smith@company1.com', 'HR Coordinator', false);

-- Вставка данных в таблицу Profile (11)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), (SELECT id FROM "Credential" WHERE name = 'Ava' AND lastname = 'Johnson'), 'Company 1', 'Sales', 'ava.johnson@company1.com', 'IT Manager', true);

-- Вставка данных в таблицу Profile (12)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), (SELECT id FROM "Credential" WHERE name = 'Noah' AND lastname = 'Davis'), 'Company 1', 'IT', 'noah.davis@company1.com', 'IT Specialist', false);

-- Вставка данных в таблицу Profile (13)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), (SELECT id FROM "Credential" WHERE name = 'Mia' AND lastname = 'Wilson'), 'Company 1', 'Sales', 'mia.wilson@company1.com', 'Sales Manager', true);

-- Вставка данных в таблицу Profile (14)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), (SELECT id FROM "Credential" WHERE name = 'Oliver' AND lastname = 'Anderson'), 'Company 1', 'Sales', 'oliver.anderson@company1.com', 'Sales Representative', false);

-- Вставка данных в таблицу Profile (15)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), (SELECT id FROM "Credential" WHERE name = 'Charlotte' AND lastname = 'Martin'), 'Company 1', 'Engineering', 'charlotte.martin@company1.com', 'Software Engineer', false);

-- Вставка данных в таблицу Profile (16)
INSERT INTO "Profile" (id, "credentialsId", "companyId", "departmentId", email, role, "isHeader")
VALUES
    (gen_random_uuid(), (SELECT id FROM "Credential" WHERE name = 'William' AND lastname = 'Taylor'), 'Company 1', 'Engineering', 'william.taylor@company1.com', 'Engineer', false);


SELECT count(name), "Department"."name", "Department"."createdAt" from "Profile" join "Department" on "Profile"."departmentId" = "Department".id
                                     group by "Department"."name", "Department"."createdAt"
                                     order by count(name) desc
                                     Limit 5;

SELECT "Profile"."email", "Profile"."isHeader", "Department"."name" FROM "Profile" JOIN "Department" ON "Profile"."departmentId" = "Department"."id";
SELECT * FROM "Profile";
SELECT * FROM "Company";
SELECT * FROM "Department";

UPDATE "Profile"
SET
    "companyId" = null,
    "departmentId" = null,
    "role" = 'admin'
where "id" = '6c4c940d-5a86-46f9-8a5b-c105a90910a5';

