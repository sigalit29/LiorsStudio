app.controller("weeklyActivityCtrl", function ($scope, $uibModal, weeklyActivitySrv, userSrv) {

    $scope.userText = "";
    $scope.weeklyImage = "";
    $scope.activeUser = userSrv.getActiveUser();
    $scope.isAdmin = $scope.activeUser.isAdmin;
    $scope.isWeeklyActivityUpdatedFromParseDb = false;

    /** First time run get all gallary slides from the Parse DB (Back4app) */
    if (!$scope.isWeeklyActivityUpdatedFromParseDb) {
        weeklyActivitySrv.getWeeklyData().then(function (ParseWeeklyData) {

            $scope.userText = ParseWeeklyData.weeklyUpdates;
            $scope.weeklyImage = ParseWeeklyData.weeklyImg;

            /**This get is done only once */
            $scope.isWeeklyActivityUpdatedFromParseDb = true;
        });
    }

    $scope.openUpdateText = function () {
        if ($scope.isAdmin) {
            var modalInstance = $uibModal.open({
                templateUrl: "app/weeklyActivity/weeklyActivityModal.html",
                controller: "weeklyActivityModalCtrl"
            })
            modalInstance.result.then(function (newText) {

                $scope.userText = newText;

                weeklyActivitySrv.UpdateWeeklyText(newText).then(function (res) {
                    console.log("user updated weekly text", res);
                });
            }, function () {
                // this will wake up in case the user canceled the text update 
                console.log("user canceled text update");
            })
        }
    };

    $scope.openUpdateImage = function () {
        if ($scope.isAdmin) {
            var modalInstance = $uibModal.open({
                templateUrl: "app/weeklyActivity/weeklyImageModal.html",
                controller: "weeklyImageModalCtrl"
            })
            modalInstance.result.then(function (newWeeklyImg) {

                $scope.weeklyImage = newWeeklyImg;

                weeklyActivitySrv.UpdateWeeklyImage(newWeeklyImg).then(function (res) {
                    console.log("user updated weekly image", res);
                });
            }, function () {
                // this will wake up in case the user canceled the new image updare
                console.log("user canceled image change");
            })
        }
    };

});


