module.exports = function (app, models) {

    var blogModel = models.blogModel;

    app.post("/hike/blog/createPost", createPost);
    app.get("/hike/blog/getPosts", getAllPosts);
    app.get("/hike/blog/:postId", getPostById);
    app.get("/hike/blog/DriversForHikers", DriversForHikers);
    app.get("/hike/blog/HikersForDrivers", HikersForDrivers);
    app.get("/hike/blog/search/:query", find);
    app.put("/hike/blog/:postId", updatePost);
    app.delete("/hike/blog/:postId", deletePost);

    function find(req, res) {
        var query = req.params["query"];
        blogModel
            .find(query)
            .then(
                function (posts) {

                   // {destination: query}, {pickup: query}, {pickupTime: query}

                    var postsToSend = [];
                    for(var i in posts){
                        if(posts[i].user === query){
                            postsToSend.push(posts[i]);
                            posts.splice(i, 1);
                        }
                    }
                    for(var i in posts){
                        if(posts[i].text === query){
                            postsToSend.push(posts[i]);
                            posts.splice(i, 1);
                        }
                    }
                    for(var i in posts){
                        if(posts[i].destination === query){
                            postsToSend.push(posts[i]);
                            posts.splice(i, 1);
                        }
                    }
                    for(var i in posts){
                        if(posts[i].pickup === query){
                            postsToSend.push(posts[i]);
                            posts.splice(i, 1);
                        }
                    }
                    for(var i in posts){
                        if(posts[i].pickupTime === query){
                            postsToSend.push(posts[i]);
                            posts.splice(i, 1);
                        }
                    }
                    for(var i in posts){
                        for(var j in posts){
                            if(posts[i].participant[j] === query){
                                postsToSend.push(posts[i]);
                                posts.splice(i, 1);
                            }
                        }
                    }

                    res.send(postsToSend);
                },
                function (error) {
                    console.log("Seach Failed!!!");
                    res.status(400).send(error);
                }
            );
    }



    function createPost(req, res) {
        var oldPost = req.body;
        console.log(oldPost.type);
        console.log(oldPost._user);
        blogModel
            .createPost(oldPost._user, oldPost)
            .then(
                function (post) {
                    post.data = null;
                    blogModel
                        .updatePost(post._id, post)
                        .then(
                            function (post) {
                                res.send(post);
                            },
                            function (error) {
                            }
                        );
                    //res.send(post);
                },
                function (error) {
                    res.status(400).send("Creation Error");
                }
            );
    }


    function getAllPosts(req, res) {
        blogModel
            .getAllPosts()
            .then(
                function (posts) {
                    res.send(posts);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function getPostById(req, res) {
        var postId = req.params["postId"];
        blogModel
            .getPostById(postId)
            .then(
                function (post) {
                    res.send(post);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function DriversForHikers(req, res) {
        blogModel
            .DriversForHikers()
            .then(
                function (posts) {
                    res.send(posts);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function HikersForDrivers(req, res) {
        blogModel
            .HikersForDrivers()
            .then(
                function (posts) {
                    res.send(posts);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updatePost(req, res) {
        var newPost = req.body;
        var id = newPost._id;
        blogModel
            .updatePost(id, newPost)
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update Post with ID: " + id);
                }
            );
    }

    function deletePost(req, res) {
        var id = req.params["postId"];

        blogModel
            .deletePost(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove Post with ID: " + id);
                }
            );
    }

};