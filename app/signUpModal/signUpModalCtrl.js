app.controller("signUpModalCtrl", function ($scope, $uibModalInstance, userSrv) {

    $scope.animationsEnabled = true;

    $scope.email = "";
    $scope.pwd = "";
    $scope.fname = "";
    $scope.lname = "";


    $scope.ok = function () {
       
        userSrv.addNewUser($scope.fname, $scope.lname, $scope.email, $scope.pwd).then(function (newUser) {
            $uibModalInstance.close(newUser);
        });
        
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };


});