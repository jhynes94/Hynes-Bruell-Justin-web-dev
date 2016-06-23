(function(){
    angular
        .module("WebAppMaker")
        .controller("BlogListController", BlogListController);

    function BlogListController($routeParams, BlogService, $sce) {
        var vm = this;
        vm.getTrustedUrl = getTrustedUrl;
        vm.getTrustedHtml = getTrustedHtml;

        function init() {
            vm.uid = $routeParams["uid"];
            vm.type = $routeParams["type"];
            vm.filter = $routeParams["filter"];

            BlogService
                .getAllPosts()
                .then(function (response) {
                    console.log(response.data);
                    vm.posts = response.data;
                });

            if(vm.filter == "Hiker"){

            }
            if(vm.filter == "Driver"){

            }
            /*
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(function(response) {
                    console.log(response.data);
                    vm.widgets = response.data;
                });
            console.log(vm.widgets);*/

        }
        init();

        function getTrustedUrl(widget){
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length -1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }


        function filtersHiker() {

        }

        function filtersDrivers() {

        }
    }
})();