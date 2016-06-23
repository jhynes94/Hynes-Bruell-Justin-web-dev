module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        type: String,
        dateCreate: {type: Date, default: Date.now},
        dateUpdated: Date,
        google: {
            id: String,
            token: String,
            displayName: String
        },
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "project.user"});

    return UserSchema
};