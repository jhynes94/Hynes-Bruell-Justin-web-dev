module.exports = function(projectDB) {

    var UserSchema = require("./user.schema.server")();
    var User = projectDB.model("Hiker", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId
    };
    return api;

    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }
    
    function createUser(user) {
        //return User.create(user);
        
        return User
            .findOne({username: user.username})
            .then(function (response) {
                if(response === null){
                    return User.create(user);
                }
                else{
                    return 400;
                }
            });
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        var theUser = User.findOne({username: username});
        return theUser;
    }

    function updateUser(id, newUser) {
        return User.update(
            {_id: id},
            {$set :
            {
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                type: newUser.type,
                email: newUser.email
            }
            }
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};