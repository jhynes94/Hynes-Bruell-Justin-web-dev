(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {

        var vm = this;

        vm.login = login;
        vm.createNewUser = createNewUser;
        vm.HIKER = "HIKER";
        vm.DRIVER = "DRIVER";

        function login(username, password) {
            if(username === "" || username === undefined){
                vm.error = "Username must have a Value";
                return null;
            }
            if(password === "" || password === undefined){
                vm.error = "Password must have a Value";
                return null;
            }
            console.log("Attempting to log in");
            UserService
                .login(username, password)
                .then(function (response) {
                    console.log(response);
                    var user = response.data;
                    if(user === null){
                        //$rootScope.currentUser = user;
                        vm.error = "User not found";
                    }
                    else{
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id + "/blog/" + user.type);
                    }
                }, function (error) {
                    vm.error = "Error: " + error;
                })
        }

        function createNewUser(username, password, vPassword, type) {
            if(username === "" || username === undefined){
                vm.error = "Username must have a Value";
                return null;
            }
            if(password === "" || password === undefined){
                vm.error = "Password must have a Value";
                return null;
            }
            
            if (!(password === vPassword)) {
                vm.error = "Non-Matching Passwords";
                return null;
            }

            var newUser = {username: username, password: password};
            newUser.type = type;
            console.log("Type is: " + type);
            UserService.createUser(newUser)
                .then(function (response) {
                    var user = response.data;
                    console.log(response);
                    console.log(user._id);
                    $rootScope.currentUser = user;
                    login(username, password);
                    //$location.url("/user/" + user._id);

                }, function (error) {
                    vm.error = "UserName has been taken";
                });
        }
    }
})();