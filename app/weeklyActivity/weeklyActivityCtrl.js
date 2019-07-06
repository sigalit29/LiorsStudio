app.controller("weeklyActivityCtrl", function ($scope, $uibModal, weeklyActivitySrv) {

    $scope.userText = "אין השבוע הודעות מיוחדות- שבוע מצויין לכולם ";
    $scope.weeklyImage = "Images/לוח שבועי.png";
    $scope.isWeeklyActivityUpdatedFromParseDb = false;

    /** First time run get all gallary slides from the Parse DB (Back4app) */
    if (!$scope.isWeeklyActivityUpdatedFromParseDb) {
        weeklyActivitySrv.getWeeklyData().then(function (ParseWeeklyData) {         
            
            $scope.userText = ParseWeeklyData.weeklyUpdates;
            if (ParseWeeklyData.WeeklyImage) {
                $scope.weeklyImage = ParseWeeklyData.weeklyImg;
            } else {
                $scope.weeklyImage = "Images/לוח שבועי.png";
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
            weeklyActivitySrv.UpdateWeeklyImage(newWeeklyImg).then(function (res) {
                console.log("user updated weekly image", res);
            });
        }, function () {
            // this will wake up in case the user canceled the new slide
            console.log("user canceled add slide");
        })
    };

});


