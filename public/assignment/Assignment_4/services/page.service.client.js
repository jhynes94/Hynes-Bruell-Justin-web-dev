(function() {
    angular.module("WebAppMaker")
        .factory("PageService", PageService);
    
    function PageService($http) {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage

        };
        return api;

        //TODO
        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page/";
            return $http.post(url, page);
        }
        //TODO
        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page/";
            return $http.get(url);
        }

        //TODO
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }
        //TODO
        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }
        //TODO
        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();