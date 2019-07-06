app.controller("weeklyActivityModalCtrl", function ($scope, $uibModalInstance) {

    $scope.animationsEnabled = true;
    $scope.weeklyText = "";

    $scope.ok = function () {          
        $uibModalInstance.close($scope.weeklyText);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };



});