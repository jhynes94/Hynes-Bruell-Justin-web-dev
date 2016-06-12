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
                    if(user === null){
                        vm.error = "User not found";
                    }
                    else{
                        $location.url("/user/" + user._id);
                    }
                }, function (error) {
                    vm.error = "Error: " + error;
                })
        }

        function createNewUser(username, password, vPassword) {
            if (!(password === vPassword)) {
                vm.error = "Non-Matching Passwords";
                return null;
            }

            //Check if User already exists
            UserService.findUserByUsername(username)
                .then(function (response) {
                    console.log(response);
                    if(response.data.username === username){
                        vm.error = "UserName Already in Use";
                        return null;
                    }
                    else{
                        var newUser = {username: username, password: password};
                        UserService.createUser(newUser)
                            .then(function (response) {
                                console.log(vm.error);
                                login(username, password);
                            }, function (error) {
                                vm.error = "User Not Created, Error: " + error;
                            })
                    }
                }, function (error) {
                    vm.error = "Error Seaching for User";
                });
        }
    }
})();