CREATE DATABASE pgPrograms

CREATE TABLE users(id serial primary key, name varchar(50), email varchar(50) UNIQUE, password varchar(50));