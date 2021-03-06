
var app = angular.module("yogaStudio", ["ngRoute", "ngImageInputWithPreview", "ngAnimate", "ngTouch", "ui.bootstrap", 'ui.bootstrap.carousel']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/home.html",
            controller: "homeCtrl"
        }).when("/userPage", {
            templateUrl: "app/userPage/userPage.html",
            controller: "userPageCtrl"
        }).when("/usersTable", {
            templateUrl: "app/userPage/usersTable.html",
            controller: "usersTableCtrl"
        }).when("/teachers", {
            templateUrl: "app/teachers/teachers.html",
            controller: "teachersCtrl"
        }).when("/moreInfoLior", {
            templateUrl: "app/teachers/moreInfoLior.html",
            controller: "moreInfoLiorCtrl"
        }).when("/moreInfoEleanor", {
            templateUrl: "app/teachers/moreInfoEleanor.html",
            controller: "moreInfoEleanorCtrl"
        }).when("/weeklyActivity", {
            templateUrl: "app/weeklyActivity/weeklyActivity.html",
            controller: "weeklyActivityCtrl"
        }).when("/workshops", {
            templateUrl: "app/workshops/workshops.html",
            controller: "workshopsCtrl"
        }).when("/priceList", {
            templateUrl: "app/priceList/priceList.html",
            controller: "priceListCtrl"
        }).when("/photoGallery", {
            templateUrl: "app/photoGallery/photoGallery.html",
            controller: "photoGalleryCtrl"
        })
})

