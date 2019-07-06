app.controller("weeklyImageModalCtrl", function ($scope, $uibModalInstance) {

    $scope.animationsEnabled = true;


    $scope.ok = function () {
        $uibModalInstance.close($scope.img.src);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };



});