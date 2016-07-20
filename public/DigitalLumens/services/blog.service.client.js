(function() {
    angular.module("WebAppMaker")
        .factory("BlogService", BlogService);

    function BlogService($http) {

        var api = {
            createPost: createPost,
            getAllPosts: getAllPosts,
            getPostById: getPostById,
            DriversForHikers: DriversForHikers,
            HikersForDrivers: HikersForDrivers,
            updatePost: updatePost,
            search: search,
            deletePost: deletePost  };
        return api;

        function search(query) {
            var url = "/hike/blog/search/" + query;
            return $http.get(url);
        }
        
        function createPost(post) {
            var url = "/hike/blog/createPost";
            return $http.post(url, post);
        }
        function getAllPosts() {
            var url = "/hike/blog/getPosts";
            return $http.get(url);
        }
        function getPostById(postId) {
            var url = "/hike/blog/" + postId;
            return $http.get(url);
        }
        function DriversForHikers() {
            var url = "/hike/blog/DriversForHikers";
            return $http.get(url);
        }
        function HikersForDrivers() {
            var url = "/hike/blog/HikersForDrivers";
            return $http.get(url);
        }
        function updatePost(postId, post) {
            var url = "/hike/blog/" + postId;
            return $http.put(url, post);
        }
        function deletePost(postId) {
            var url = "/hike/blog/" + postId;
            return $http.delete(url);
        }
    }
})();