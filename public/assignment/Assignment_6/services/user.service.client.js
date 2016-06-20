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
            return $http.get("/api/loggedin");
        }

        function updateUser(id, newUser) {
            var url = "/api/user/"+id;
            return $http.put(url, newUser);
        }

        function createUser(user) {
            //var data = {username: user.username, password: user.password};
            var url = "/api/user";
            return $http.post(url, user);
        }
        
        function deleteUser(id) {
            var url = "/api/user/"+id;
            console.log("Delete Account:" + id);
            return $http.delete(url);
        }
    
        function getUsers() {
            var url = "/api/user";
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }
        function findUserByUsername(userName){
            var url = "/api/userSearch/" + userName;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

    }
})();