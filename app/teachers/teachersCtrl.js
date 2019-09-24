app.controller("teachersCtrl", function($scope, $location, $log) {

    $scope.goToHomePage = function () {
        $location.path("/");
    }

 
})