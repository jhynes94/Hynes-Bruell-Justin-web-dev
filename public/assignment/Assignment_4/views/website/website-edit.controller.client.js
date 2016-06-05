(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            console.log(vm.uid);
            console.log(vm.websiteId);
            console.log(WebsiteService.findWebsitesByUser(vm.uid));
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response) {
                    console.log(response.data);
                    vm.website = response.data;
                    vm.name = vm.website.name;
                    vm.comment = vm.website.comment;
                });
        }
        init();

        function updateWebsite() {
            vm.website.name = vm.name;
            vm.website.comment = vm.comment;
            WebsiteService.updateWebsite(vm.websiteId, vm.website)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website");
                });
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.websiteId)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website");
                });
        }
    }
})();