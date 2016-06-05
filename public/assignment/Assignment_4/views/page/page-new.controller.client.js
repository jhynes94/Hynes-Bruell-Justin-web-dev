(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.createPage = createPage;

        function init() { }
        init();

        function createPage(){
            var page = {};
            page._id = (Math.floor(Math.random()*90000) + 10000).toString();
            page.name = vm.name;
            page.title = vm.title;
            page.websiteId = vm.websiteId;
            PageService.createPage(vm.websiteId, page)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page");
                });
        }
    }
})();