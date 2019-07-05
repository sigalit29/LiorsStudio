app.controller("updateModalCtrl", function ($scope, $uibModalInstance, userSrv) {

    $scope.animationsEnabled = true;

    $scope.email = "";
    $scope.fname = "";
    $scope.lname = "";
    $scope.phone = "";

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.ok = function () {

        updateUser(fname, lname, email, phone)
        userSrv.updateUser($scope.fname, $scope.lname, $scope.email, $scope.phone).then(function (newUser) {
            $uibModalInstance.close(newUser);

        });
    };

});