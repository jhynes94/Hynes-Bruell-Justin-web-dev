(function(){
    angular
        .module("WebAppMaker")
        .controller("NewBlogController", NewBlogController);

    function NewBlogController($routeParams, BlogService, $location) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.type = $routeParams["type"];
        vm.createPost = createPost;

        function init() {
        }
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
                    $location.url("/user/" + vm.uid + "/blog/" + vm.type);
                });
        }
    }
})();