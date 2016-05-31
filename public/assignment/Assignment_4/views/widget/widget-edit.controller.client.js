(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.deleteWidget = deleteWidget;
        vm.update = update;

        function init() {
            vm.uid = $routeParams["uid"];
            vm.wid = $routeParams["wid"];
            vm.pid = $routeParams["pid"];
            vm.wgit = $routeParams["wgit"];
            vm.widget = WidgetService.findWidgetById(vm.wgit);
            console.log(vm.widget.widgetType);
        }
        init();

        function update(widget){
            console.log("Widget Updated");
            $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page/" + vm.pid + "/widget");
        }
        function deleteWidget(widget) {
            console.log("Widget Deleted");
            WidgetService.deleteWidget(widget._id);
            $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page/" + vm.pid + "/widget");
        }
    }
})();