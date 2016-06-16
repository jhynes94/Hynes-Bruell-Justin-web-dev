module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        websites: [],
        dateCreate: {type: Date, default: Date.now},
        dateUpdated: Date,
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "assignment.user"});

    return UserSchema
};