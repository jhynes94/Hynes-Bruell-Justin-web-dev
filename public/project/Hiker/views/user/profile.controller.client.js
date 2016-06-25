(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, BlogService, $location, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteAccount = deleteAccount;
        vm.logout = logout;
        vm.deleteEvent = deleteEvent;

        var id = $routeParams["uid"];
        var index = -1;
        function init() {
            if($rootScope.currentUser) {
                vm.user = $rootScope.currentUser
            }
            else {
                UserService
                    .findUserById(id)
                    .then(function (response) {
                        vm.user = response.data;
                    })
            }

            BlogService
                .search(vm.user.username)
                .then(function (response) {
                    console.log("Results found for: " + vm.user.username);
                    console.log(response.data);
                    vm.posts = response.data;
                });


            if (id === undefined || id === null){
                console.log("Redirecting to Proper Address for user: "  + vm.user._id);
                $location.url("/user/" + vm.user._id);
            }
        }
        init();

        function deleteEvent(postId, post) {
            console.log("Delete Event!");
            BlogService
                .deletePost(postId)
                .then(function (response) {
                    console.log("EventDeleted");
                    console.log(response.data);
                });

            BlogService
                .search(vm.user.username)
                .then(function (response) {
                    console.log("Results found for: " + vm.user.username);
                    console.log(response.data);
                    vm.posts = response.data;
                });

        }


        function logout() {
            UserService
                .logout(vm.user)
                .then(function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }, function (error) {
                        vm.error = "Error Logging out";
                    }
                )
        }

        function updateUser() {
            UserService.updateUser(vm.user._id, vm.user)
                .then(function (response) {
                    vm.success = "User successfully updated";
                }, function (error) {
                    vm.error = "User not found";
                });
        }

        function deleteAccount() {
            UserService.deleteUser(vm.user._id)
                .then(function(response) {
                    $location.url("/login");
                });
        }
    }
})();