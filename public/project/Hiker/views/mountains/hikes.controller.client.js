(function(){
    angular
        .module("WebAppMaker")
        .controller("HikesController", HikesController);

    function HikesController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.getTrustedUrl = getTrustedUrl;
        vm.getTrustedHtml = getTrustedHtml;

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
            
            $( "#sortable" ).sortable({ axis: 'y', handle: '.fa-bars', placeholder: "ui-state-highlight"}).disableSelection();
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