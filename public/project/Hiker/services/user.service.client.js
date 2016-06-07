(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByCredentials,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;


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
    
        //TODO Update this
        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

    }
})();