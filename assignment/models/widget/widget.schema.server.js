var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = mongoose.Schema({
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
        //TODO Change Type to be Enum
        type: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: String,
        size: String,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        order: Number,
        dateCreated : {type : Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "assignment.widgets"});

    return WidgetSchema;
};