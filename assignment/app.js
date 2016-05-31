module.exports = function(app) {
    
    var userService = require("./services/user.services.server")(app);


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    //Call and Responce Basic
    app.get("/say/:message", function(req, res) {
        var msg = req.params["message"];
        console.log(msg);
        res.send({message: msg});
    });

    //Get All Users
    app.get("/allUsers", function(req, res) {
        //var msg = req.params["message"];
        //console.log(msg);
        res.send(users);
    });

    //Get Specific User
    app.get("/allUsers/:username", function(req, res) {
        var username = req.params["username"];
        for(var i in users){
            if(users[i].username === username){
                res.send(users[i]);
            }
        }
    });
};