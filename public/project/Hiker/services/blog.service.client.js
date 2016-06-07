(function() {
    angular.module("BlogService")
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
            var url = "/api/page/" + pageId + "/widget/";
            return $http.post(url, widget);
        }
        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget/";
            return $http.get(url);
        }
        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }
        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }
        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }
    }
})();