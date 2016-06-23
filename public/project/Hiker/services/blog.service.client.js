(function() {
    angular.module("WebAppMaker")
        .factory("BlogService", BlogService);

    function BlogService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/hike/page/" + pageId + "/widget/";
            return $http.post(url, widget);
        }
        function findWidgetsByPageId(pageId) {
            var url = "/hike/page/" + pageId + "/widget/";
            return $http.get(url);
        }
        function findWidgetById(widgetId) {
            var url = "/hike/widget/" + widgetId;
            return $http.get(url);
        }
        function updateWidget(widgetId, widget) {
            var url = "/hike/widget/" + widgetId;
            return $http.put(url, widget);
        }
        function deleteWidget(widgetId) {
            var url = "/hike/widget/" + widgetId;
            return $http.delete(url);
        }
    }
})();