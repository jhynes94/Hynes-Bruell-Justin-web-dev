var mongoose = require("mongoose");

module.exports = function() {

    var PageSchema = mongoose.Schema({
        _website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
        name: String,
        title: String,
        description: String,
        widgets: [],
        dateCreated : {type : Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "assignment.page"});

    return PageSchema;
};