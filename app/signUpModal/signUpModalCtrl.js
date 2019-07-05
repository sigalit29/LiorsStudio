app.controller("signUpModalCtrl", function ($scope, $uibModalInstance, userSrv) {

    $scope.animationsEnabled = true;

    $scope.Email = "";
    $scope.Pwd = "";
    $scope.Fname = "";
    $scope.Lname = "";


    $scope.ok = function () {
        
        
        userSrv.addNewUser($scope.Fname, $scope.Lname, $scope.Email, $scope.Pwd).then(function (newUser) {
            $uibModalInstance.close(newUser);
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };


});