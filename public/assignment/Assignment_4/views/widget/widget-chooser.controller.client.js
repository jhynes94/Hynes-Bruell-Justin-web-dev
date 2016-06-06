(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.newHeader = newHeader;
        vm.newYoutube = newYoutube;
        vm.newImage = newImage;

        function init() {
            vm.uid = $routeParams["uid"];
            vm.wid = $routeParams["wid"];
            vm.pid = $routeParams["pid"];
        }
        init();

        function newHeader(){
            console.log("New Header!");
            var header = {};
            header._id = (Math.floor(Math.random()*90000) + 10000).toString();
            header.widgetType = "HEADER";
            header.size = "1";
            header.pageId = vm.pid;
            internalCreateWidget(header);
        }
        function newYoutube(){
            console.log("New Youtube Link!");
            var header = {};
            header._id = (Math.floor(Math.random()*90000) + 10000).toString();
            header.widgetType = "YOUTUBE";
            header.pageId = vm.pid;
            internalCreateWidget(header);
        }
        function newImage(){
            console.log("New Image!");
            var header = {};
            header._id = (Math.floor(Math.random()*90000) + 10000).toString();
            header.widgetType = "IMAGE";
            header.width = "100%";
            header.pageId = vm.pid;
            internalCreateWidget(header);
        }
        
        function internalCreateWidget(header) {
            console.log(header);
            WidgetService
                .createWidget(header.pageId, header)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + header._id);
                });
                
        }
    }
})();