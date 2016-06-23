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
                    vm.Pemi = response.data;
                    if (vm.Pemi === null) {
                        //$rootScope.currentUser = user;
                        vm.error = "Weather Not found";
                    }
                    else {

                    }
                }, function (error) {
                    vm.error = "Error: " + error;
                });


            //Mt Washington
            var LonLat = "44.270482,-71.303263";

            WeatherService
                .getWeather(LonLat)
                .then(function (response) {
                    console.log(response.data);
                    vm.Washington = response.data;
                    if (vm.Washington === null) {
                        //$rootScope.currentUser = user;
                        vm.error = "Weather Not found";
                    }
                    else {

                    }
                }, function (error) {
                    vm.error = "Error: " + error;
                });


            //Waterville Vally
            var LonLat = "43.961709,-71.495186";

            WeatherService
                .getWeather(LonLat)
                .then(function (response) {
                    console.log(response.data);
                    vm.Waterville = response.data;
                    if (vm.Waterville === null) {
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