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
            for (var i in users) {
                if (users[i]._id === id) {
                    users[i] = newUser;
                    return true;
                }
            }
            return false;
        }

        function createUser(user) {
            users.push(user);
        }

        function deleteUser(id) {
            for (var i in users) {
                if (users[i]._id === id) {
                    delete users[i];
                }
            }
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            var user = findUserByUsernameAndPassword(username, password);
            if (user){
                return user;
            }
            return null;
        }

        function findUserById(id) {
            var user = findUserByIdServer(id);
            if(user){
                return user;
            }
            return null;
        }

        function findUserByIdServer(Id){
            var url = "/api/user/" + Id;
            return $http.get(url);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

    }
})();