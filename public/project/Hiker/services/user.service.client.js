(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            login: login,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            getUsers: getUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            logout: logout,
            findUserByUsername: findUserByUsername,
            checkLoggedin: checkLoggedin,
            register: register
        };
        return api;

        function checkLoggedin() {
            console.log('CHECKING LOGIN STATUS');
            return $http.get("/hike/loggedin");
        }

        function updateUser(id, newUser) {
            var url = "/hike/user/"+id;
            return $http.put(url, newUser);
        }

        function createUser(user) {
            //var data = {username: user.username, password: user.password};
            var url = "/hike/user";
            return $http.post(url, user);
        }
        
        function deleteUser(id) {
            var url = "/hike/user/"+id;
            console.log("Delete Account:" + id);
            return $http.delete(url);
        }
    
        function getUsers() {
            var url = "/hike/user";
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/hike/user?username="+username+"&password="+password;
            return $http.get(url);
        }
        function findUserById(id) {
            var url = "/hike/user/" + id;
            return $http.get(url);
        }
        function findUserByUsername(userName){
            var url = "/hike/userSearch/" + userName;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/hike/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function logout(user) {
            return $http.post("/hike/logout");
        }

        function register(user) {
            return $http.post("/hike/register", user);
        }

    }
})();