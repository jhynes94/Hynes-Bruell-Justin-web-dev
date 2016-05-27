(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createWebsite = createWebsite;

        function init() { }
        init();
        function createWebsite(){
            var website = {};
            website._id = Math.floor(Math.random()*90000) + 10000;
            website.name = vm.name;
            website.developerId = vm.uid;
            //website.comment = vm.comment;
            WebsiteService.createWebsite(vm.uid, website);
            console.log(website);

            var websites = WebsiteService.findWebsitesByUser(vm.uid);
            console.log(websites);
            $location.url("/user/" + vm.uid + "/website");
        }
    }
})();