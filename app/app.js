
var app = angular.module("yogaStudio", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/home/home.html",
        controller: "homeCtrl"
    }).when("/userPage", {
        templateUrl: "app/userPage/userPage.html",
        controller: "userPageCtrl"
    }).when("/new", {

    })
}) 