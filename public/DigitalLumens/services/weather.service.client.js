(function() {
    angular.module("WebAppMaker")
        .factory("WeatherService", WeatherService);

    function WeatherService($http) {

        var api = {
            getWeather: getWeather
        };
        return api;

        function getWeather(LonLat) {
            var url = "http://cors.io/?u=https://api.forecast.io/forecast/1c451e04775d20a329e61883ff7de45f/" + LonLat;
            console.log(LonLat);
            return $http.get(url);
        }
    }
})();