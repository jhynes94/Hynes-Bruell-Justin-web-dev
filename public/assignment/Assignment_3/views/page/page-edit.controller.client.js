(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

            function init() {
                console.log(vm.uid);
                console.log(vm.websiteId);
                console.log(vm.pageId);
                console.log(PageService.findPageById(vm.pageId));
            vm.name = PageService.findPageById(vm.pageId).name;
            vm.title = PageService.findPageById(vm.pageId).title;
        }
        init();

        function updatePage() {
            console.log(vm.pageId);
            var page = PageService.findPageById(vm.pageId);
            page.name = vm.name;
            page.title = vm.title;
            PageService.updatePage(vm.pageId, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page");
        }

        function deletePage(){
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.uid + "/website/"  + vm.websiteId + "/page");
        }

        // function createPage(){
        //     var website = [];
        //     website.comment = vm.comment
        //     website.name = vm.name;
        //     website.developerId = vm.uid;
        //     website._id = Math.floor(Math.random()*90000) + 10000;
        //     WebsiteService.createWebsite(vm.uid, website)
        //     $location.url("/user/" + vm.uid + "/website");
        // }
    }
})();