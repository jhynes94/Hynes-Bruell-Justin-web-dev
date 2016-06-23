(function(){
    angular
        .module("WebAppMaker")
        .controller("NewBlogController", NewBlogController);

    function NewBlogController($routeParams, BlogService, UserService, $location) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.type = $routeParams["type"];
        vm.createPost = createPost;

        function init() {
            UserService
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                })
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
            //TODO change from uid to Username Requires Promise
            post.user = vm.user.username;
            console.log("User: " + vm.user.username);
            post.destination = vm.destination;
            console.log("Destination: " + vm.destination);
            post.pickup = vm.pickup;
            console.log("Pickup Location: " + vm.pickup);
            post.pickupTime = vm.pickupTime;
            console.log("Pickup Time: " + vm.pickupTime);

            BlogService.createPost(post)
                .then(function(response) {
                    $location.url("/user/" + vm.uid + "/blog/" + vm.type);
                });
        }
    }
})();