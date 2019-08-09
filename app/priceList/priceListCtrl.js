app.controller("priceListCtrl", function($scope, $location, $log) {

    $scope.goToHomePage = function () {
        $location.path("/");
    }
 
})