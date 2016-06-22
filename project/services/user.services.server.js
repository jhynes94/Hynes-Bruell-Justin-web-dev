module.exports = function (app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var userModel = models.userModel;

    app.post("/hike/user", createUser);
    app.get("/hike/user", getUsers);
    app.get("/hike/user/:userId", findUserById);
    app.put("/hike/user/:userId", updateUser);
    app.delete("/hike/user/:userId", deleteUser);
    app.get("/hike/userSearch/:userName", findUserByUsername);
    app.post('/hike/logout', logout);
    app.get ('/hike/loggedin', loggedin);
    app.post("/hike/login", login);



    function loggedin(req, res) {
        console.log("loggedIn ATTEMPT!");

        var thingsICanLog = [];
        for (var key in req) {
            thingsICanLog.push(key);
        }
        console.log(JSON.stringify(thingsICanLog));
        
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        var newUser = req.body;
        var username = newUser.username;
        var password = newUser.password;
        //username = "hike2";

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log('USER: ' + JSON.stringify(user));
                    var hashMatch = false;
                    try {
                        hashMatch = bcrypt.compareSync(password, user.password);
                    } catch (error) {
                        res.json(user);
                    }
                    console.log('HASH MATCH: ' + hashMatch);
                    if(user.username === username && hashMatch) {
                        console.log('RETURN USER');
                        res.json(user);
                        //return done(null, user);
                    } else {
                        res.json(user);
                    }
                },
                function(err) {
                    if (err) { res.json(err); }
                }
            );
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    if(user === 400){
                        res.status(400).send("Username " + newUser.username + " is already in use");
                    }
                    else {
                        res.json(user);
                    }
                },
                function(error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
            );
        // var newUser = req.body;
        //
        // for(var i in users) {
        //     if(users[i].username === newUser.username) {
        //         res.status(400).send("Username " + newUser.username + " is already in use");
        //         return;
        //     }
        // }
        //
        // newUser._id = (new Date()).getTime() + "";
        // users.push(newUser);
        // res.json(newUser);
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
        // var id = req.params["userId"];
        // for(var i in users) {
        //     if(users[i]._id === id) {
        //         users.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to remove user with ID: " + id);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
        // var newUser = req.body;
        // var id = newUser._id;
        // for(var i in users) {
        //     if(users[i]._id === id) {
        //         users[i] = newUser;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(400).send("User with ID: "+ id +" not found");
    }


    function getUsers(req, res) {

        //qconsole.log(req.session.currentUser);

        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
        // var username = req.query["username"];
        // var password = req.query["password"];
        // console.log("REQUEST: Usr: " + username + " Psw: " + password);
        // if(username && password) {
        //     //find user by creds
        //     findUserByCredentials(username, password, res);
        // }
        // else if (username){
        //     for(var i in users){
        //         if(users[i].username === username){
        //             res.send(users[i]);
        //         }
        //     }
        // }
        // else {
        //     res.send(users);
        // }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(403).send("Unable to login");
                }
            );
        // for(var i in users){
        //     if(users[i].username === username && users[i].password === password){
        //         res.send(users[i]);
        //         console.log("User: " + users[i]);
        //         return;
        //     }
        // }
        // res.send(404);
    }

    function findUserByUsername(req, res) {
        var userName = req.params.userName;
        userModel
            .findUserByUsername(userName)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
    }



    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.status(400).send(error);
                }
            );

        // var userId = req.params["userId"];
        // for(var i in users){
        //     if(users[i]._id === userId){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send(404);
    }
};