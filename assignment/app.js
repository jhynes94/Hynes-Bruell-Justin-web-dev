module.exports = function(app) {
    
    var userService = require("./services/user.services.server")(app);
    var websiteService = require("./services/website.services.server")(app);
    var pageService = require("./services/page.services.server")(app);
    var widgetService = require("./services/widget.services.server")(app);


    //Call and Responce Basic
    app.get("/say/:message", function(req, res) {
        var msg = req.params["message"];
        console.log(msg);
        res.send({message: msg});
    });
};