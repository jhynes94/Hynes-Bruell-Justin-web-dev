(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            var userId = $routeParams.userId;
            vm.websites = WebsiteService.findWebsitesForUser(userId);
        }
        init();
        vm.userID = $routeParams.userId;


        function gotoProfile() {
            $location.url("/profile/" + vm.user._id);
        }
    }
})();