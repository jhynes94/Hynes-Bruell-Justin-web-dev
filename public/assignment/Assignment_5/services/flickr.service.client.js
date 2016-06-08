(function () {
    angular.module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "b0f6169f77c1ce83f8057765e4b142cf";
    var secret = "1a8a8b7ab92ed933";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


    function FlickrService($http) {

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();