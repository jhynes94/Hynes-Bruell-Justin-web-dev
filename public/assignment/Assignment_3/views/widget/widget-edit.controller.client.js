(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;

        function init() {
            vm.uid = $routeParams["uid"];
            vm.wid = $routeParams["wid"];
            vm.pid = $routeParams["pid"];
            vm.wgit = $routeParams["wgit"];
            vm.widget = WidgetService.findWidgetById(vm.wgit);
            console.log(vm.widget.widgetType);
        }
        init();
    }
})();