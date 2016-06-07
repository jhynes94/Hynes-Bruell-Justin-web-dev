module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@gmail.com" },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        for(var i in users) {
            if(users[i].username === newUser.username) {
                res.status(400).send("Username " + newUser.username + " is already in use");
                return;
            }
        }

        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    function deleteUser(req, res) {
        var id = req.params["userId"];
        for(var i in users) {
            if(users[i]._id === id) {
                users.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove user with ID: " + id);
    }

    function updateUser(req, res) {
        var newUser = req.body;
        var id = newUser._id;
        for(var i in users) {
            if(users[i]._id === id) {
                users[i] = newUser;
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: "+ id +" not found");
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