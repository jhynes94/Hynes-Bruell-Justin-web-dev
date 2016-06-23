(function () {
    angular
        .module("WebAppMaker")
        .controller("WeatherController", WeatherController);

    function WeatherController($routeParams, WeatherService, BlogService, $sce) {
        var vm = this;
        vm.weatherFunction = weatherFunction;

        function init() {
            //Pemi Loop
            var LonLat = "44.144034,-71.539669";

            //var url = "http://cors.io/?u=https://api.forecast.io/forecast/1c451e04775d20a329e61883ff7de45f/" + LonLat;
            /*
            $.getJSON(url, function(data) {
                //data is the JSON string
            });*/

            WeatherService
                .getWeather(LonLat)
                .then(function (response) {
                    console.log(response.data);
                    vm.weather = response.data;
                    if (vm.weather === null) {
                        //$rootScope.currentUser = user;
                        vm.error = "Weather Not found";
                    }
                    else {

                    }
                }, function (error) {
                    vm.error = "Error: " + error;
                });
        }

        init();

        function weatherFunction() {
        }
    }
})();