app.controller("weeklyActivityCtrl", function ($scope, $uibModal) {

    $scope.userText ="";
    $scope.openUpdateText = function () {
        var modalInstance = $uibModal.open({
            templateUrl: "app/weeklyActivity/weeklyActivityModal.html",
            controller: "weeklyActivityModalCtrl"
        })

        modalInstance.result.then(function (userText) {
            // this will wake in case the user added a new recipe
            $scope.userText = userText;
           
        }, function () {
            // this will wake up in case the user canceled the new recipe
            console.log("user canceled text update");
        })
    };


});