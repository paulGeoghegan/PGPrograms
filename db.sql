--run the below command to create your database then connect to it and you can run the rest of the file
--CREATE DATABASE pgPrograms

--Drops tables
DROP TABLE users;
DROP TABLE classes;
DROP TABLE myclasses;

--Creates users table
CREATE TABLE users(userId serial primary key, name varchar(50), email varchar(50) UNIQUE, password varchar);

--Creates myclasses table
CREATE TABLE myclasses();

--Creates classes table and inserts some rows
CREATE TABLE classes(classId serial primary key, className varchar, classDescription varchar, classlevel varchar);
INSERT INTO classes(classname, classdescription, classlevel) values('Intro to Programming', 'This is an introductory programming course which will take you through the basics of programming', 'Basic');
INSERT INTO classes(classname, classdescription, classlevel) values('Object Orientated Programming', 'This is a follow on to the beginner programming class. This class dives more indept into the programming fundimentals and starts to explore concepts such as Object Orientated Programming.', 'Intermediate');
INSERT INTO classes(classname, classdescription, classlevel) values('Introduction to AI Programming', 'This programming class will explore advanced concepts such as machine learning and AI', 'advanced');
