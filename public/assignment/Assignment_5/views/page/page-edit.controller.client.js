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
                //console.log(PageService.findPageById(vm.pageId));
                PageService
                    .findPageById(vm.pageId)
                    .then(function(response) {
                        console.log(response.data);
                        vm.page = response.data;
                        vm.name = vm.page.name;
                        vm.title = vm.page.title;
                    });
        }
        init();

        function updatePage() {
            console.log(vm.pageId);
            vm.page.name = vm.name;
            vm.page.title = vm.title;
            PageService.updatePage(vm.pageId, vm.page)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.websiteId + "/page");
                });
        }

        function deletePage(){
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.uid + "/website/"  + vm.websiteId + "/page");
        }
    }
})();