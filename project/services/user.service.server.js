var app = require("../../express");
var userModel = require("../models/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// html handlers
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/login", passport.authenticate('local'), login);
app.post("/api/logout", logout);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.put("/api/user", updateUserHistory);
app.get("/api/checkLogin", checkLogin);
app.get("/api/users", getAllUsers);

function logout(req, response) {
    req.logOut();
    response.send(200);
}

function checkLogin(req, response) {
    response.send(req.isAuthenticated() ? req.user : '0');
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function(user) {
                if (!user) {
                    return done(null, "0");
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function login(req, response) {
    var user = req.user;
    response.json(user);

}

function registerUser(req, response) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            response.json(user);
        })
}

function deleteUser(req, response) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function getUserById(req, response) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        })
}

function findUser(req, response) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            response.json(user);
            return;
        }, function (err) {
            response.send("0");
            return;
        })

}

function updateUser(req, response) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            response.json(status);
        }, function (err) {
           response.sendStatus(404).send(err);
        });
}

function updateUserHistory(req, response) {
    var userId = req.query.userId;
    var message = req.query.message;
    userModel
        .addToHistory(userId, message)
        .then(function (status) {
            response.json(status);
        })
}

function getAllUsers(req, response) {
    userModel
        .getAllUsers()
        .then(function (users) {
            response.json(users);
        })
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
