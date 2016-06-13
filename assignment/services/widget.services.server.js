module.exports = function (app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "1235", "widgetType": "IMAGE", "pageId": "321", "width": "80%",
    //         "url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Mount_Washington_chained_building.jpg"},
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", updateWidgetSort);

    function updateWidgetSort(req, res) {
        var start = req.query["start"];
        var end = req.query["end"];
        var pageId = req.params["pageId"];

        widgetModel
            .reorderWidget(pageId, start, end)
            .then(
                function (widget) {
                    resp.send(widget);
                },
                function (error) {
                    resp.status(400).send("Widget reorder failed.");
                }
            );
    }

    function createWidget(req, res) {
        var oldWidget = req.body;
        var newWidget = {
            //size: Number(oldWidget.size),
            size: oldWidget.size,
            width: oldWidget.width,
            type: oldWidget.widgetType,
            text: ""
        };
        widgetModel
            .createWidget(oldWidget.pageId, newWidget)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.status(400).send("Creation Error");
                }
            );

        // var newWidget = req.body;
        // widgets.push(newWidget);
        // res.json(newWidget);
    }


    function findAllWidgetsForPage(req, res) {
        var pageId = req.params["pageId"];
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );

        // var pageId = req.params["pageId"];
        //
        // var widgetPages = [];
        // for (var i in widgets) {
        //     if (widgets[i].pageId === pageId) {
        //         widgetPages.push(widgets[i]);
        //     }
        // }
        // res.send(widgetPages);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params["widgetId"];
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );


        // var widgetId = req.params["widgetId"];
        // for (var i in widgets) {
        //     if (widgets[i]._id === widgetId) {
        //         res.send(widgets[i]);
        //         return;
        //     }
        // }
        // res.send(404);
    }

    function updateWidget(req, res) {
        var newWidget = req.body;
        var id = newWidget._id;
        widgetModel
            .updateWidget(id, newWidget)
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );


        // var newWidget = req.body;
        // var id = newWidget._id;
        // for (var i in widgets) {
        //     if (widgets[i]._id === id) {
        //         widgets[i] = newWidget;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(400).send("ID: " + id + " not found");
    }

    function deleteWidget(req, res) {
        var id = req.params["widgetId"];

        widgetModel
            .deleteWidget(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove website with ID: " + id);
                }
            );

        // var id = req.params["widgetId"];
        // for (var i in widgets) {
        //     if (widgets[i]._id === id) {
        //         widgets.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to remove widget with ID: " + id);
    }

    function uploadImage(req, resp) {
        var widgetId = req.body.widgetId;
        var pageId = req.body.pageId;
        var websiteId = req.body.websiteId;
        var userId = req.body.userId;
        var width = req.body.width;
        var myFile = req.file; //Dedicated attribute for files.

        var originalname = myFile.originalname;
        var filename     = myFile.filename; //Service will need this filename to find the file in the future.
        var path         = myFile.path;
        var destination  = myFile.destination;
        var size         = myFile.size;
        var mimetype     = myFile.mimetype;


        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    var widgetToEdit = widget;
                    widgetToEdit.width = width;
                    widgetToEdit.url = "/../uploads/" + filename;
                    widgetModel
                        .updateWidget(widgetId, widgetToEdit)
                        .then(
                            function (widget) {
                                resp.redirect("./../assignment/index.html#/user/" + userId + "/website/" + websiteId +
                                    "/page/" + pageId + "/widget/" + widgetId);
                            },
                            function (error) {
                                resp.status(400).send("Widget with id: " + widgetId +
                                    " could not be updated. Widget not found.");
                            }
                        );
                },
                function (error) {
                    resp.status(404).send("Could not add image to widget with id: " + widgetId);
                }
            );
    }

};