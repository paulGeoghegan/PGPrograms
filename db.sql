--run the below command to create your database then connect to it and you can run the rest of the file
--CREATE DATABASE pgPrograms

--Drops tables
DROP TABLE users;
DROP TABLE classes;

--Creates users table
CREATE TABLE users(userId serial primary key, name varchar(50), email varchar(50) UNIQUE, password varchar);

--Creates classes table and inserts some rows
CREATE TABLE classes(classId serial primary key, className varchar, classDescription varchar);
INSERT INTO classes('Programming Basics', 'This is an introductory programming course which will take you through the basics of programming');
