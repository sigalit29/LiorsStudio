app.controller("weeklyActivityCtrl", function ($scope, $uibModal, weeklyActivitySrv) {

    $scope.userText = "";
    $scope.weeklyImage = "Images/WeeklyImage.png";
    $scope.isWeeklyActivityUpdatedFromParseDb = false;

    /** First time run get all gallary slides from the Parse DB (Back4app) */
    if (!$scope.isWeeklyActivityUpdatedFromParseDb) {
        weeklyActivitySrv.getWeeklyData().then(function (ParseWeeklyData) {         
            
            $scope.userText = ParseWeeklyData.weeklyUpdates;
            if (ParseWeeklyData.WeeklyImage) {
                $scope.weeklyImage = ParseWeeklyData.weeklyImg;
            } else {
                $scope.weeklyImage ="Images/WeeklyImage.png";
            }
            /**This get is done only once */
            $scope.isWeeklyActivityUpdatedFromParseDb = true;
        });
    }

    $scope.openUpdateText = function () {
        var modalInstance = $uibModal.open({
            templateUrl: "app/weeklyActivity/weeklyActivityModal.html",
            controller: "weeklyActivityModalCtrl"
        })
        modalInstance.result.then(function (newText) {
            // this will wake in case the user added a new recipe
            $scope.userText = newText;
              // pdateWeeklyData(newText, newImage)
            weeklyActivitySrv.UpdateWeeklyData(newText, $scope.weeklyImage).then(function (res) {
                console.log("user updated weekly text", res);
            });
        }, function () {
            // this will wake up in case the user canceled the new recipe
            console.log("user canceled text update");
        })
    };

    $scope.openUpdateImage = function () {
        var modalInstance = $uibModal.open({
            templateUrl: "app/weeklyActivity/weeklyImageModal.html",
            controller: "weeklyImageModalCtrl"
        })
        modalInstance.result.then(function (newWeeklyImg) {
            // this will wake in case the user added a new recipe
            $scope.weeklyImage = newWeeklyImg;
            // pdateWeeklyData(newText, newImage)
            weeklyActivitySrv.UpdateWeeklyData($scope.userText, newWeeklyImg).then(function (res) {
                console.log("user updated weekly image", res);
            });
        }, function () {
            // this will wake up in case the user canceled the new slide
            console.log("user canceled add slide");
        })
    };

});


