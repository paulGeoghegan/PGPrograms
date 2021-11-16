const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const pgp = require('pg-promise')({});
const { PreparedStatement: PS } = require('pg-promise');
// connection = protocol://userName:password@host:port/databaseName
const db = pgp('postgres://postgres:password@localhost:5432/lab6');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function() {
    console.log('Server running on port 3000');
});

//Sets routs for nav bar
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/pages/index.html");
});
app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/public/pages/about.html");
});
app.get("/classes", function(req, res) {
    res.sendFile(__dirname + "/public/pages/classes.html");
});
app.get("/createAccount", function(req, res) {
    res.sendFile(__dirname + "/public/pages/createAccount.html");
});
app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/public/pages/login.html");
});
app.get("/news", function(req, res) {
    res.sendFile(__dirname + "/public/pages/news.html");
});
app.get("/timeTable", function(req, res) {
    res.sendFile(__dirname + "/public/pages/timeTable.html");
});

