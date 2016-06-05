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
            var result = UserService.updateUser(vm.user._id, vm.user);
            if(result === true) {
                vm.success = "User successfully updated";
            } else {
                vm.error = "User not found";
            }
        }

        function deleteAccount() {
            UserService.deleteUser(vm.user._id);
            $location.url("/login");
        }
    }
})();