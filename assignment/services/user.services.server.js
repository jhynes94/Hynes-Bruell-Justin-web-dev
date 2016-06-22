module.exports = function (app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");


    var userModel = models.userModel;

    var facebookConfig = {
        clientID     : 138474376573030,
        clientSecret : 'ae59a3a862812b17ae665a3fed040e05',
        callbackURL  : '/auth/facebook/callback'
    };

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com" },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/Assignment_6/#/user',
            failureRedirect: '/assignment/Assignment_6/#/login'
        }));

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/userSearch/:userName", findUserByUsername);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);
    app.post("/api/login", passport.authenticate('wam'), login);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));



    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        userModel
            .findUserByFacebookId(id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var user = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        }
                        return userModel
                            .createUser(user);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
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

    //OLD VERSION DELETE!!!
    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        userModel
            .createUser(user)
            .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log('USER: ' + JSON.stringify(user));
                    var hashMatch = false;
                    try {
                        hashMatch = bcrypt.compareSync(password, user.password);
                    } catch (error) {
                        return (error, null);
                    }
                    console.log('HASH MATCH: ' + hashMatch);
                    if(user.username === username && hashMatch) {
                        console.log('RETURN USER');
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
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