(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteAccount = deleteAccount;

        var id = $routeParams["uid"];
        var index = -1;
        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                })
        }
        init();

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