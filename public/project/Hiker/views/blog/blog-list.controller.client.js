(function(){
    angular
        .module("WebAppMaker")
        .controller("BlogListController", BlogListController);

    function BlogListController($routeParams, BlogService, UserService, $sce) {
        var vm = this;
        vm.filtersHiker = filtersHiker;
        vm.filtersDrivers = filtersDrivers;
        vm.filtersRest = filtersRest;
        vm.search = search;
        vm.invite = invite;
        vm.join = join;

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


            UserService
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                })

        }
        init();


        function invite(postId, post) {
            console.log("Invite Pressed");


            //post.participant = [];

            for(var i in post.participant){
                if(post.participant[i] === vm.user.username){
                    post.participant.splice( i, 1 );
                    BlogService.updatePost(postId, post)
                        .then(function (response) {
                            vm.success = "User successfully updated";
                            filtersRest();
                        }, function (error) {
                            vm.error = "User not found";
                        });
                    return null;
                }
            }

            post.participant.push(vm.user.username);

            BlogService.updatePost(postId, post)
                .then(function (response) {
                    vm.success = "User successfully updated";
                    filtersRest();
                }, function (error) {
                    vm.error = "User not found";
                });
        }
        
        function join(postId, post) {
            console.log("Join Pressed");

            //post.participant = [];

            for(var i in post.participant){
                if(post.participant[i] === vm.user.username){
                    post.participant.splice( i, 1 );
                    BlogService.updatePost(postId, post)
                        .then(function (response) {
                            vm.success = "User successfully updated";
                            filtersRest();
                        }, function (error) {
                            vm.error = "User not found";
                        });
                    return null;
                }
            }

            post.participant.push(vm.user.username);

            BlogService.updatePost(postId, post)
                .then(function (response) {
                    console.log("SuccessfulUpdate")
                    vm.success = "User successfully updated";
                    filtersRest();
                }, function (error) {
                    vm.error = "User not found";
                });
        }




        function search(query) {
            console.log("Searching for: " + query);
            BlogService
                .search(query)
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
        }


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
        }
    }
})();