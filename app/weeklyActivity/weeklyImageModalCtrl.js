app.controller("weeklyImageModalCtrl", function ($scope, $uibModalInstance) {

    $scope.animationsEnabled = true;
    $scope.img.src = "Images/לוח שבועי.png";

    $scope.ok = function () {
        $uibModalInstance.close($scope.img.src);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };



});