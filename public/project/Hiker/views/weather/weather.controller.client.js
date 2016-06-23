(function(){
    angular
        .module("WebAppMaker")
        .controller("WeatherController", WeatherController);

    function WeatherController($routeParams, WeatherService, $sce) {
        var vm = this;
        vm.weatherFunction = weatherFunction;

        function init() {

            //https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
            /*vm.uid = $routeParams["uid"];
            vm.wid = $routeParams["wid"];
            vm.pid = $routeParams["pid"];*/
        }
        init();

        function weatherFunction(widget) {
            return null;
        }
    }
})();