var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
    };
    return api;

};