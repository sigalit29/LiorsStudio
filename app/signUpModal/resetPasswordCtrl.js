
app.controller("resetPwdModalCtrl", function ($scope, $uibModalInstance, userSrv) {

    $scope.animationsEnabled = true;

    $scope.email = "";

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.ok = function () {
        userSrv.resetPassword($scope.email, $scope.pwd).then(function () {
             
        });
        $uibModalInstance.dismiss();    
    };

});