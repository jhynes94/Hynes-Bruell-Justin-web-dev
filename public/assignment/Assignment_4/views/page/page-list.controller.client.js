(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            vm.uid = $routeParams["uid"];
            vm.wid = $routeParams["wid"];
            PageService
                .findPageByWebsiteId(vm.wid)
                .then(function(response) {
                    console.log(response.data);
                    vm.pages = response.data;
                });
        }
        init();
    }
})();