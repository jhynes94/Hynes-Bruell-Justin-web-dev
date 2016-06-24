module.exports = function(assignDB) {
    
    var BlogSchema = require("./blog.schema.server")();
    var Blog = assignDB.model("Blog", BlogSchema);

    var api = {
        createPost: createPost,
        getAllPosts: getAllPosts,
        getPostById: getPostById,
        DriversForHikers: DriversForHikers,
        HikersForDrivers: HikersForDrivers,
        updatePost: updatePost,
        find: find,
        deletePost: deletePost
    };
    return api;


    function find(query) {
        console.log("Search for: " + query);
        return Blog.find();
    }
    
    function createPost(userId, post) {
        post._user = userId;
        post.data = "NewPostToConfigure";
        return Blog
            .find({_user: userId})
            .then(
                function (user) {
                    return Blog
                        .create(post)
                        .then(
                            function (created) {
                                return Blog
                                    .findOne({data: "NewPostToConfigure"})
                                    .then(
                                        function (posts) {
                                            return posts;
                                        },
                                        function (error) {
                                            return null;
                                        }
                                    );
                            },
                            function (error) {
                                return null;
                            }
                        )
                },
                function (error) {
                    console.log("User ID Not found");
                    return null;
                }
            );
    }

    function getAllPosts() {
        return Blog.find();
    }
    DriversForHikers
    /*
    function findAllWidgetsForPage(userId) {
        return Blog.find({_user: userId});
    }*/
    function DriversForHikers() {
        return Blog.find({type: "DRIVER"});
    }
    function HikersForDrivers() {
        return Blog.find({type: "HIKER"});
    }

    function getPostById(postId) {
        return Blog.findById(postId);
    }

    function updatePost(postId, post) {
        return Blog.update(
            {_id: postId},
            {$set :
            {
                type: post.type,
                participant: post.participant,
                text: post.text,
                url: post.url,
                width: post.width,
                height: post.height,
                user: post.user,
                destination: post.destination,
                pickup: post.pickup,
                pickupTime: post.pickupTime
            }
            }
        );
    }

    function deletePost(postId) {
        return Blog.remove({_id: postId});
    }
};