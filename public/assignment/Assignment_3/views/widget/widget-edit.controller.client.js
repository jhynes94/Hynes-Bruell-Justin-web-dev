(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;

        function init() {
            vm.uid = $routeParams["uid"];
            vm.wid = $routeParams["wid"];
            vm.pid = $routeParams["pid"];
        }
        init();
    }
})();