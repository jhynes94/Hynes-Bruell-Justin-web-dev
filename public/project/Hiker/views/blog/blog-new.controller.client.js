(function(){
    angular
        .module("WebAppMaker")
        .controller("NewBlogController", NewBlogController);

    function NewBlogController($routeParams, BlogService, $location) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.createPost = createPost;

        function init() { }
        init();

        function createPost(){
            /*if(vm.name === undefined || vm.name === ""){
                vm.error = "Name must have a Value";
                return null;
            }*/
            var post = {};
            
            post._user = vm.uid;
            console.log("User: " + vm.uid);
            post.text = vm.text;
            console.log("Text: " + vm.text);
            post.type = vm.type;
            console.log("Type: " + vm.type);

            BlogService.createPost(post)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/blog");
                });
            
            /*
            website.comment = vm.comment;
            console.log("Comment: " + vm.comment);
            website.name = vm.name;
            console.log("Name: " + vm.name);
            website.developerId = vm.uid;
            console.log(vm.uid);
            website._id = (Math.floor(Math.random()*90000) + 10000).toString();
            console.log(website._id);
            
            WebsiteService.createWebsite(vm.uid, website)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/website");
                });*/
        }
    }
})();