(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.getTrustedUrl = getTrustedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.sortList = sortList;

        function sortList(start, stop) {
            console.log("Widget Controller");

            console.log("start: " + start + ", stop: " + stop);
            WidgetService
                .updateWidgetSort(vm.pid, start, stop)
                .then(
                    function (resp) {
                        vm.widgets = resp.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function init() {
            vm.uid = $routeParams["uid"];
            vm.wid = $routeParams["wid"];
            vm.pid = $routeParams["pid"];
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(function(response) {
                    console.log(response.data);
                    vm.widgets = response.data;
                });
            console.log(vm.widgets);
            $(".widget-container").sortable({ axis: 'y', handle: '.fa-bars', placeholder: "ui-state-highlight"}).disableSelection();
        }
        init();

        function getTrustedUrl(widget){
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length -1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }
    }
})();