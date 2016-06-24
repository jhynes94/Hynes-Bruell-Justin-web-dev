module.exports = function() {
    var mongoose = require("mongoose");

    var BlogSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'Hiker' },
        type: String,
        text: String,
        url: String,
        width: String,
        user: String,
        participant: [],
        destination: String,
        pickup: String,
        pickupTime: String,
        data: String,
        height: String,
        dateCreated : {type : Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "project.blog"});

    return BlogSchema;
};