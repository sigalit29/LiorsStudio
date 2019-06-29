app.controller("signUpModalCtrl", function ($scope, $location, $log, $uibModalInstance, userSrv) {

    $scope.animationsEnabled = true;
    $scope.email;
    $scope.pwd;
    $scope.fname;
    $scope.lmane;

    $scope.ok = function () {
        // function addNewUser(fname,lname,email,pwd){
        userSrv.addNewUser($scope.fname, $scope.lname, $scope.email, $scope.pwd).then(function (newUser) {
                $uibModalInstance.close(newUser);
            });
      };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };


});