module.exports = function() {

    var mongoose = require('mongoose');

    var connectionString = 'mongodb://localhost/cs4550summer1';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var assignDB = mongoose.createConnection(connectionString);

    
    var userModel = require("./user/user.model.server.js")(assignDB);
    var websiteModel = require("./website/website.model.server.js")(assignDB);
    var pageModel = require("./page/page.model.server.js")(assignDB);
    var widgetModel = require("./widget/widget.model.server.js")(assignDB);

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
};