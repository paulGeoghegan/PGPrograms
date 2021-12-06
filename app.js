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
const dbUserName = process.env.dbusername;
const password = process.env.password;
const dbName = process.env.dbname
const db = pgp(`postgres://${dbUserName}:${password}@localhost:5432/${dbName}`);


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// these settings are for development only
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
    new LocalStrategy({usernameField:'email', passwordField:'password'}, function (username, password, done) {

        console.log("start of login",username);

        const findUser = new PS({
            name: "find-user",
            text: "SELECT userid, email, password FROM users WHERE email = $1;",
            values: [username],
        });


        db.one(findUser)
            .then(function (row) {
                console.log(row.userid, row.email);

                if (!row) {
                    return done(null, false, { message: "User not found." });
                }
                bcrypt.compare(
                    password,
                    row.password,
                    function (err, result) {
                        if (result == true) {
                            done(null, { id: row.userid});

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
    console.log(user, done);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const findUser = new PS({
        name: "deserialize-user",
        text: "SELECT userid FROM users WHERE userid = $1;",
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

//Sets routs for nav bar and login links
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/pages/index.html");
});
app.get("/account", isAuthenticated(), function(req, res) {
    res.sendFile(__dirname + "/public/pages/account.html");
});
app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/public/pages/about.html");
});
app.get("/classes", isAuthenticated(), function(req, res) {
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
    console.log("Before PS");
    const selectClasses = new PS({
                name: 'select-classes',
                text: 'SELECT * FROM classes ORDER BY classid;'
        });
    console.log("Before db.any");
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

//Adds a user to the database
app.post("/adduser", function(req, res) {

    //Sets variables
    const email = req.body.email;
    const password = req.body.password;
    saltRounds = 10;

    //hashes password
    bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(err);

    //Stores user in db
    const insert = new PS({
        name: "insert-user",
        text: "INSERT INTO users (email, password) VALUES ($1, $2);",
        values: [email, hash],
    });
    db.none(insert)
        .then(function(rows){
            console.log('Success!');

    })
        .catch(function(error){
            console.log(error);
            return res.status(400).send(error);
        });
});
}) //End add user

//Changes the users password
app.post("/changePassword", function(req, res) {

    console.log(req.session.id);
    console.log(req.userid);

    //Sets variables
    const id = req.session.id.id;
    const password = req.body.password;
    saltRounds = 10;

    //hashes password
    bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(err);

    //Changes users password
    const update = new PS({
        name: "update-passwword",
        text: "UPDATE users set password = $1 WHERE userid = $2;",
        values: [hash, id],
    });
    db.none(update)
        .then(function(rows){
            console.log('Success! updated password');

    })
        .catch(function(error){
            console.log(error);
            return res.status(400).send(error);
        });
});
}) //End add user


//logs user in
app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return next(err);
        } //End if
        else if(!user) {
            console.log(info);
            return res.status(400).send(info);
        } //End else if

        req.logIn(user, function(err) {
            if (err) {
                console.log(err);
                return next(err);
            } //End if
        else{
            console.log("Redirecting");
            return res.redirect('/');
        }//End else

        });
        console.log("test1");
    })(req, res, next);
    console.log("test2");
});

//Checks if the user is logged in
app.get("/loggedin", function(req, res) {
        if (req.isAuthenticated()) {
            console.log("user loggedin");
        link ='<a href="/account">Account</a>';
            console.log(link);
        res.status(200).json (link);
        } //End if
        else
        {
            console.log("User not loggedin");
            link='<a href="/createAccount">Create Account</a>\t<a href="/login">Login</a>';
            console.log(link);
        res.status(200).json(link);
    } //End else
}); //end loggedin

//Checks if the user has logged in
function isAuthenticated() {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login');
    }
}

