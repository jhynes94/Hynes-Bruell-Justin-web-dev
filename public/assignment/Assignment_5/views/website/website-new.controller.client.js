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
            if(vm.name === undefined){
                vm.error = "Name must have a Value";
                return null;
            }
            var website = {};
            website.comment = vm.comment;
            console.log("Comment: " + vm.comment);
            website.name = vm.name;
            console.log("Name: " + vm.name);
            website.developerId = vm.uid;
            console.log(vm.uid);
            website._id = (Math.floor(Math.random()*90000) + 10000).toString();
            console.log(website._id);
            WebsiteService.createWebsite(vm.uid, website)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website");
                });
        }
    }
})();