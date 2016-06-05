(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.uid = $routeParams["uid"];
            var userId = $routeParams["uid"];
            
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(function(response) {
                    console.log(response.data);
                    vm.websites = response.data;
                });
        }
        init();
    }
})();