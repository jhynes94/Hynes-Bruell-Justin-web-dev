module.exports = function(assignDB) {

    var WebsiteSchema = require("./website.schema.server")();
    var Website = assignDB.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }
    
    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }
    
    function updateWebsite(newWebsite) {
        return Website.update(
            {_id: newWebsite._id},
            {$set :
            {
                name : newWebsite.name,
                description : newWebsite.description
            }
            }
        );
    }
    
    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

};