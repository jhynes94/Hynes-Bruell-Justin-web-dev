module.exports = function(app) {

    var models = require("./models/models.js")();
    
    var userService = require("./services/user.services.server")(app, models);
    var websiteService = require("./services/website.services.server")(app, models);
    var pageService = require("./services/page.services.server")(app, models);
    var widgetService = require("./services/widget.services.server")(app, models);


    //Call and Responce Basic
    app.get("/say/:message", function(req, res) {
        var msg = req.params["message"];
        console.log(msg);
        res.send({message: msg});
    });
};