module.exports = function() {

    var mongoose = require('mongoose');

    var connectionString = 'mongodb://localhost/project';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var projectDB = mongoose.createConnection(connectionString);

    var userModel = require("./user/user.model.server")(projectDB);
    var blogModel = require("./blog/blog.model.server")(projectDB);

    var models = {
        userModel: userModel,
        blogModel: blogModel
    };

    return models;
};