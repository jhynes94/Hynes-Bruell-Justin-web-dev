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
        vm.createWebsite = createWebsite;

        function init() {
            console.log(vm.uid);
            console.log(vm.websiteId);
            vm.name = WebsiteService.findWebsiteById(vm.websiteId).name;
            vm.comment = WebsiteService.findWebsiteById(vm.websiteId).comment;
        }
        init();

        function updateWebsite(newName, newComment) {
            var website = WebsiteService.findWebsiteById(vm.websiteId);
            website.name = vm.name;
            website.comment = vm.comment;
            WebsiteService.updateWebsite(vm.websiteId, website)
            $location.url("/user/" + vm.uid + "/website");
        }

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.uid + "/website");
        }

        function createWebsite(){
            var website = [];
            website.comment = vm.comment
            website.name = vm.name;
            website.developerId = vm.uid;
            website._id = Math.floor(Math.random()*90000) + 10000;
            WebsiteService.createWebsite(vm.uid, website)
            $location.url("/user/" + vm.uid + "/website");
        }
    }
})();