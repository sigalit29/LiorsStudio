
var app = angular.module("yogaStudio", ["ngRoute", "ngImageInputWithPreview", "ngAnimate", "ngTouch", "ui.bootstrap"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/home/home.html",
        controller: "homeCtrl"
    }).when("/userPage", {
        templateUrl: "app/userPage/userPage.html",
        controller: "userPageCtrl"
    }).when("/teachers", {
        templateUrl: "app/teachers/teachers.html",
        controller: "teachersCtrl"
    }).when("/weeklyActivity", {
        templateUrl: "app/weeklyActivity/weeklyActivity.html",
        controller: "weeklyActivityCtrl"
    }).when("/workshops", {
        templateUrl: "app/workshops/workshops.html",
        controller: "workshopsCtrl"
    }).when("/photoGallery", {
        templateUrl: "app/photoGallery/photoGallery.html",
        controller: "photoGalleryCtrl"
    })
}) 

