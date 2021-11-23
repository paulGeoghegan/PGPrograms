require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const pgp = require('pg-promise')({});
const { PreparedStatement: PS } = require('pg-promise');
// connection = protocol://userName:password@host:port/databaseName
const userName = process.env.username;
const password = process.env.password;
const dbName = process.env.dbname
const db = pgp(`postgres://${userName}:${password}@localhost:5432/${dbName}`);


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// this settings are for development only
app.use(
    session({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(function (username, password, done) {
        const findUser = new PS({
            name: "find-user",
            text: "SELECT email, password FROM users WHERE email = $1;",
            values: [email],
        });

        db.one(findUser)
            .then(function (row) {
                if (!row) {
                    return done(null, false, { message: "User not found." });
                }
                bcrypt.compare(
                    password,
                    row.user_password,
                    function (err, result) {
                        if (result == true) {
                            done(null, { id: row.user_id });
                        } else {
                            return done(null, false, {
                                message: "Incorrect password",
                            });
                        }
                    }
                );
            })
            .catch(function (error) {
                return done(error);
            });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const findUser = new PS({
        name: "deserialize-user",
        text: "SELECT user_id FROM users WHERE user_id = $1;",
        values: [id],
    });
    let error;
    let row;
    db.one(findUser)
        .then(function (res) {
            row = res;
            console.log(res);
            console.log("User found!");
            done(error, res);
        })
        .catch(function (err) {
            error = err;
            console.log("Error happened!");
            console.log(err, row);
        });

});

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

//Database roots
app.get("/classeslist", function(req, res) {

    const selectClasses = new PS({
                name: 'select-classes',
                text: 'SELECT * FROM classes ORDER BY classid;'
        });
    db.any(selectClasses)
                        .then(function(rows) {
                            console.log(rows);
                            res.status(200).json(rows);
                        })
                        .catch(function(errors) {
                            console.log(errors);
                            res.status(400).json(errors)
                        });
    })

