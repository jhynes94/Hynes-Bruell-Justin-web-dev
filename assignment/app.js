module.exports = function(app) {
    
    var userService = require("./services/user.services.server")(app);


    //Call and Responce Basic
    app.get("/say/:message", function(req, res) {
        var msg = req.params["message"];
        console.log(msg);
        res.send({message: msg});
    });

    /*
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

     //Get Specific User
     app.get("/allUsers/:username", function(req, res) {
     var username = req.params["username"];
     for(var i in users){
     if(users[i].username === username){
     res.send(users[i]);
     return;
     }
     }
     res.send(404);
     });
    */
};