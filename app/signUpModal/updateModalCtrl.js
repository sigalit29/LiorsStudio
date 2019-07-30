app.controller("updateModalCtrl", function ($scope, $uibModalInstance, userSrv) {
    var userData = $scope.$resolve.userData;
    $scope.animationsEnabled = true;

    $scope.email = userData.email;
    $scope.fname = userData.fname;
    $scope.lname = userData.lname;
    $scope.phone = userData.phone;

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.ok = function () {
      
        userSrv.updateUser($scope.fname, $scope.lname, $scope.email, $scope.phone).then(function (newUser) {
            $uibModalInstance.close(newUser);
        });
    };

});