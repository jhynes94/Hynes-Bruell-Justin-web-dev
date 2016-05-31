(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.uid = $routeParams["uid"];
            var userId = $routeParams["uid"];
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }
})();