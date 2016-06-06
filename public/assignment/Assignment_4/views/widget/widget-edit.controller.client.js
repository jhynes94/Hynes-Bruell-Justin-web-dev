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
            WidgetService
                .findWidgetById(vm.wgit)
                .then(function(response) {
                    console.log(response.data);
                    vm.widget = response.data;
                });
        }
        init();

        function update(widget){
            console.log(widget);
            WidgetService
                .updateWidget(vm.wgit, widget)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }
        function deleteWidget(widget) {
            console.log("Widget Deleted");
            WidgetService
                .deleteWidget(widget._id)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }
    }
})();