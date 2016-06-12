var mongoose = require("mongoose");

module.exports = function() {

    var PageSchema = mongoose.Schema({
        websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
        name : String,
        description : String,
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.page"});

    return PageSchema;
};