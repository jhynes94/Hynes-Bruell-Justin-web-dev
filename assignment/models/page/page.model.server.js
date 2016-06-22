module.exports = function(assignDB) {

    var PageSchema = require("./page.schema.server")();
    var Page = assignDB.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        delete page.websiteId;
        delete page._id;
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return Page.findById(pageId);
    }

    function updatePage(pageId, page) {
        return Page.update(
            {_id: pageId},
            {$set :
            {
                _website: page._website,
                name: page.name,
                title: page.title,
                description: page.description
            }
            }
        );
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }

};