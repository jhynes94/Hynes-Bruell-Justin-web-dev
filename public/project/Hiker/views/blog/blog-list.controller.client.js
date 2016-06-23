(function(){
    angular
        .module("WebAppMaker")
        .controller("BlogListController", BlogListController);

    function BlogListController($routeParams, BlogService, $sce) {
        var vm = this;
        vm.filtersHiker = filtersHiker;
        vm.filtersDrivers = filtersDrivers;
        vm.filtersRest = filtersRest;

        function init() {
            vm.uid = $routeParams["uid"];
            vm.type = $routeParams["type"];
            vm.filter = $routeParams["filter"];

            console.log(vm.filter);

            BlogService
                .getAllPosts()
                .then(function (response) {
                    console.log(response.data);
                    vm.posts = response.data;
                    if(vm.filter == "Hiker"){
                        filtersHiker();
                    }
                    if(vm.filter == "Driver"){
                        filtersDrivers();
                    }
                });



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


        function filtersHiker() {
            console.log("filtersHiker");
            for(var i in vm.posts){
                if(vm.posts[i].type === "DRIVER"){
                    vm.posts[i].type = "DRIVER2";
                    console.log("Driver Found")
                }
            }
            for(var i in vm.posts){
                if(vm.posts[i].type === "HIKER2"){
                    vm.posts[i].type = "HIKER";
                }
            }
        }

        function filtersDrivers() {
            console.log("filtersDriver");
            for(var i in vm.posts){
                if(vm.posts[i].type === "HIKER"){
                    vm.posts[i].type = "HIKER2";
                    console.log("Hiker Found")
                }
            }
            for(var i in vm.posts){
                if(vm.posts[i].type === "DRIVER2"){
                    vm.posts[i].type = "DRIVER";
                }
            }
        }

        function filtersRest() {
            console.log("Filter Reset");
            for(var i in vm.posts){
                if(vm.posts[i].type === "HIKER2"){
                    vm.posts[i].type = "HIKER";
                }
            }
            for(var i in vm.posts){
                if(vm.posts[i].type === "DRIVER2"){
                    vm.posts[i].type = "DRIVER";
                }
            }
        }
    }
})();