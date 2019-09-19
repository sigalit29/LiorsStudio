app.controller("moreInfoEleanorCtrl", function($scope, $location, $log) {

    $scope.GoToTeachers = function () {
        $location.path("/teachers");
    }
    $scope.goToHomePage = function () {
        $location.path("/");
    }

})