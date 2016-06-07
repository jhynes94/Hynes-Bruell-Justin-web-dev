(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/default", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/blog", {
                templateUrl: "views/blog/blog-list.view.client.html",
                controller: "BlogListController",
                controllerAs: "model"
            })
            .when("/user/:uid/hikes", {
                templateUrl: "views/mountains/hikes.view.client.html",
                controller: "HikesController",
                controllerAs: "model"
            })
            .when("/user/:uid/weather", {
                templateUrl: "views/weather/weather.view.client.html",
                controller: "WeatherController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();