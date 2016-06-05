module.exports = function (app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        newWebsite._id = (new Date()).getTime() + "";
        websites.push(newWebsite);
        res.json(newWebsite);
    }


    function findAllWebsitesForUser(req, res) {
        var userId = req.params["userId"];

        var userWebsites = [];
        for(var i in websites){
            if(websites[i].developerId === userId){
                userWebsites.push(websites[i]);
            }
        }
        res.send(userWebsites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params["websiteId"];
        for(var i in websites){
            if(websites[i]._id === websiteId){
                res.send(websites[i]);
                return;
            }
        }
        res.send(404);
    }

    function updateWebsite(req, res) {
        var newWebsite = req.body;
        var id = newWebsite._id;
        for(var i in websites) {
            if(websites[i]._id === id) {
                websites[i] = newWebsite;
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: "+ id +" not found");
    }

    function deleteWebsite(req, res) {
        var id = req.params["websiteId"];
        for(var i in websites) {
            if(websites[i]._id === id) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove Website with ID: " + id);
    }

};