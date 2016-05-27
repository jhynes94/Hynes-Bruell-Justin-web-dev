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
            vm.wid = $routeParams["wid"];
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
            console.log(vm.widgets);
            vm.widget = WidgetService.findWidgetById(vm.wid);
            console.log(vm.widget.widgetType);
        }
        init();
    }
})();