app.controller("signUpModalCtrl", function ($scope, $location, $log, $uibModalInstance, userSrv) {

    $scope.animationsEnabled = true;

    $scope.signUpEmail = "";
    $scope.signUpPwd = "";
    $scope.signUpFname = "";
    $scope.signUpLname = "";


    $scope.ok = function () {
        
        
        userSrv.addNewUser($scope.signUpFname, $scope.signUpLname, $scope.signUpEmail, $scope.signUpPwd).then(function (newUser) {
            $uibModalInstance.close(newUser);
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };


});