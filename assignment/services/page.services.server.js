module.exports = function (app, models) {

    var pageModel = models.pageModel;

    // var pages = [
    //     {"_id": "321", "name": "Post 1", "websiteId": "456"},
    //     {"_id": "432", "name": "Post 2", "websiteId": "456"},
    //     {"_id": "543", "name": "Post 3", "websiteId": "456"}
    // ]

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req, res) {
        var newPage = req.body;

        pageModel
            .createPage(newPage.websiteId, newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
        // var newPage = req.body;
        // newPage._id = (new Date()).getTime() + "";
        // pages.push(newPage);
        // res.json(newPage);
    }


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        pageModel
            . findAllPagesForWebsite(websiteId)
            .then(
                function(pages){
                    res.send(pages);
                },
                function(error){
                    res.status(400).send(error);
                }
            );

        // var websiteId = req.params["websiteId"];
        //
        // var userPages = [];
        // for (var i in pages) {
        //     if (pages[i].websiteId === websiteId) {
        //         userPages.push(pages[i]);
        //     }
        // }
        // res.send(userPages);
    }

    function findPageById(req, res) {
        var pageId = req.params["pageId"];
        pageModel
            . findPageById(pageId)
            .then(
                function(page){
                    res.send(page);
                },
                function(error){
                    res.status(400).send(error);
                }
            );


        // var pageId = req.params["pageId"];
        // for (var i in pages) {
        //     if (pages[i]._id === pageId) {
        //         res.send(pages[i]);
        //         return;
        //     }
        // }
        // res.send(404);
    }

    function updatePage(req, res) {
        var newPage = req.body;
        var id = newPage._id;
        pageModel
            .updatePage(id, newPage)
            .then(
                function(page) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );

        // var newPage = req.body;
        // var id = newPage._id;
        // for (var i in pages) {
        //     if (pages[i]._id === id) {
        //         pages[i] = newPage;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(400).send("ID: " + id + " not found");
    }

    function deletePage(req, res) {
        var id = req.params["pageId"];

        pageModel
            .deletePage(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove website with ID: " + id);
                }
            );

        // var id = req.params["pageId"];
        // for (var i in pages) {
        //     if (pages[i]._id === id) {
        //         pages.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to remove Page with ID: " + id);
    }


};