(function() {
    angular.module("WebAppMaker")
        .factory("WeatherService", WeatherService);

    function WeatherService($http) {

        var api = {
            getWeather: getWeather
        };
        return api;

        function getWeather() {
            var url = "/hike/blog/getPosts";
            return $http.get(url);
        }
    }
})();