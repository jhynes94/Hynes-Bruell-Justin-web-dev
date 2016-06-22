module.exports = function(app) {
    
    var models = require("./models/models.js")();

    var userService = require("./services/user.services.server")(app, models);
    var blogService = require("./services/blog.services.server")(app, models);

    //Call and Responce Basic
    app.get("/hiker/:message", function(req, res) {
        var msg = req.params["message"];
        console.log(msg);
        res.send({message: msg});
    });
};