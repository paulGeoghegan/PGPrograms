const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise');
const {PreparedStatement PS} = require('pg-promise');
const db = pgp('postgres://user:password@host:5432/databaseName');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.listen(3000, function() {
    console.log('Server running on port 3000');
});

//Sets routs for nav bar
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/pages/index.html");
});
app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/pages/about.html");
});
app.get("/classes", function(req, res) {
    res.sendFile(__dirname + "/pages/classes.html");
});
app.get("/createAccount", function(req, res) {
    res.sendFile(__dirname + "/pages/createAccount.html");
});
app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/pages/login.html");
});
app.get("/news", function(req, res) {
    res.sendFile(__dirname + "/pages/news.html");
});
app.get("/timeTable", function(req, res) {
    res.sendFile(__dirname + "/pages/timeTable.html");
});

