module.exports = function (app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");


    var userModel = models.userModel;

    var facebookConfig = {
        clientID     : 138474376573030,
        clientSecret : 'ae59a3a862812b17ae665a3fed040e05',
        callbackURL  : '/auth/facebook/callback'
    };

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/Hiker/#/user',
            failureRedirect: '/project/Hiker/#/login'
        }));


    var googleConfig = {
        clientID        : '1008409942956-bl14jouauh9qt8d2aa2ronkfao1rdgqn.apps.googleusercontent.com',
        clientSecret    : 'k0tcT6p0m_Ww9HVxmtqpWVdS',
        callbackURL     : '/auth/google/callback'
    };

    /* Google */
    app.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/project/Hiker/#/user',
            failureRedirect: '/project/Hiker/#/login'
        }));



    app.post("/hike/user", createUser);
    app.get("/hike/user", getUsers);
    app.get("/hike/user/:userId", findUserById);
    app.put("/hike/user/:userId", updateUser);
    app.delete("/hike/user/:userId", deleteUser);
    app.get("/hike/userSearch/:userName", findUserByUsername);
    app.post('/hike/logout', logout);
    app.post ('/hike/register', register);
    app.get ('/hike/loggedin', loggedin);
    app.post("/hike/login", passport.authenticate('wam'), login);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));



    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function googleStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        userModel
            .findUserByGoogleId(id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            type: "HIKER",
                            google: {
                                id:    profile.id,
                                token: token,
                                displayName: emailParts[0]
                            }
                        };
                        return userModel
                            .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            );
    }



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
                            type: "HIKER",
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