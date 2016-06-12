var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = mongoose.Schema({
        _page: String,
        name: String,
        title: String,
        description: String,
        widgets: [],
        dateCreated : {type : Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "assignment.page"});

    return WidgetSchema;
};