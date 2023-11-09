SELECT * FROM "Profile";
SELECT * FROM "Company";
SELECT * FROM "Department";
SELECT * FROM "Credential";

INSERT INTO "Credential" (ID, NAME, LASTNAME, PASSWORD) VALUES ('00c814d1-af4b-4c2d-ae8c-964d78403f0e' ,'vsevolod', 'trusov', 'qwerty');
INSERT INTO "Credential" (ID, NAME, LASTNAME, PASSWORD) VALUES ('00c814d1-af4b-4c2d-ae8c-964d11403f0e' ,'mark', 'lewsha', 'qwerty');
INSERT INTO "Credential" (ID, NAME, LASTNAME, PASSWORD) VALUES ('00c814d1-af4b-4c2d-ae8c-111d78403f0e' ,'gleb', 'chlystov', 'qwerty');
COMMIT;

INSERT INTO "Department" (ID, NAME, DESCRIPTION) VALUES ('00c814d1-af4b-4c2d-ae8c-964d78403f0e' ,'east-west', 'some');
INSERT INTO "Department" (ID, NAME, DESCRIPTION) VALUES ('00c814d1-af4b-4c2d-ae8c-964d33303f0e' ,'noth', 'some');
COMMIT;

INSERT INTO "Company" (NAME) VALUES ('etaCar');
COMMIT;

INSERT INTO "Profile" (ID, EMAIL, ROLE, "isHeader", "companyName", "departmentId", "credentialsId")
VALUES ('e5c50f2d-cb4a-4256-9b36-294b3d2fda16' ,'vsevolod@mail.ru', 'user', false, 'etaCar', '00c814d1-af4b-4c2d-ae8c-964d78403f0e', '00c814d1-af4b-4c2d-ae8c-964d78403f0e');
INSERT INTO "Profile" (ID, EMAIL, ROLE,  "isHeader", "companyName", "departmentId", "credentialsId")
VALUES ('e5c50f2d-cb4a-4256-9b36-294b3d2fda46' ,'mark@mail.ru', 'user', false, 'etaCar', '00c814d1-af4b-4c2d-ae8c-964d78403f0e','00c814d1-af4b-4c2d-ae8c-964d11403f0e');
INSERT INTO "Profile" (ID, EMAIL, ROLE,  "isHeader", "companyName", "departmentId", "credentialsId")
VALUES ('e5c50f2d-cb4a-4256-9b36-294b3d2fda56' ,'gleb@mail.ru', 'staff', false, 'etaCar', '00c814d1-af4b-4c2d-ae8c-964d78403f0e', '00c814d1-af4b-4c2d-ae8c-111d78403f0e');
COMMIT;
