var mongoose = require("mongoose");

module.exports = function() {

    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite
    };
    return api;

    function createPage(websiteId, page) {
        page.websiteId = websiteId;
        return page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return page.find({websiteId: websiteId});
    }

};