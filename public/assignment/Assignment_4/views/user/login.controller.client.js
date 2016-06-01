(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {

        var vm = this;

        vm.login = login;
        vm.createNewUser = createNewUser;

        function login(username, password) {
            UserService
                .findUserByUsernameAndPassword(username, password)
                .then(function (response) {
                    var user = response.data;
                    $location.url("/user/" + user._id);
                }, function (error) {
                    vm.error = "User not found. Error: " + error;
                })
        }


        //TODO add randomly created ID
        function createNewUser(username, password, vPassword) {
            if (!(password === vPassword)) {
                vm.error = "Non-Matching Passwords";
                return null;
            }
            var newUser = {_id: "444", username: username, password: password}
            UserService.createUser(newUser);
            $location.url("/user/" + newUser._id);
        }
    }
})();