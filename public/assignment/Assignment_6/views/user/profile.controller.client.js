(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteAccount = deleteAccount;
        vm.logout = logout;

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
        }
        init();


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