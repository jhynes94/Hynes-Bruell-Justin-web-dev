module.exports = function (app) {
    
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function createWidget(req, res) {
        var newWidget = req.body;
        widgets.push(newWidget);
        res.json(newWidget);
    }


    function findAllWidgetsForPage(req, res) {
        var pageId = req.params["pageId"];

        var widgetPages = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageId) {
                widgetPages.push(widgets[i]);
            }
        }
        res.send(widgetPages);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params["widgetId"];
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                res.send(widgets[i]);
                return;
            }
        }
        res.send(404);
    }

    function updateWidget(req, res) {
        var newWidget = req.body;
        var id = newWidget._id;
        for (var i in widgets) {
            if (widgets[i]._id === id) {
                widgets[i] = newWidget;
                res.send(200);
                return;
            }
        }
        res.status(400).send("ID: " + id + " not found");
    }

    function deleteWidget(req, res) {
        var id = req.params["widgetId"];
        for (var i in widgets) {
            if (widgets[i]._id === id) {
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove widget with ID: " + id);
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
    }
    
};