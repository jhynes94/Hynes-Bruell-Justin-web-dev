module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    //Call and Responce Basic
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    //app.put("/api/user/:userId", updateUser);

    function updateUser(req, res) {
        //var id = req.params.userId;

    }


    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        console.log("REQUEST: Usr: " + username + " Psw: " + password);
        if(username && password) {
            //find user by creds
            findUserByCredentials(username, password, res);
        }
        else if (username){
            for(var i in users){
                if(users[i].username === username){
                    res.send(users[i]);
                }
            }
        }
        else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        for(var i in users){
            if(users[i].username === username && users[i].password === password){
                res.send(users[i]);
                console.log("User: " + users[i]);
                return;
            }
        }
        res.send(404);
    }



    function findUserById(req, res) {
        var userId = req.params["userId"];
        for(var i in users){
            if(users[i]._id === userId){
                res.send(users[i]);
                return;
            }
        }
        res.send(404);
    }
};