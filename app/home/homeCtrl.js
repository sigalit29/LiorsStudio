app.controller("homeCtrl", function ($scope, $location, $log, $uibModal) {

    $scope.invalidLogin = false;
    // $scope.email = "nir@nir.com";
    // $scope.pwd = "123";
    $scope.email = "";
    $scope.pwd = "";

    $scope.login = function () {

        // userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
        //     $log.info("Successful login with: " + JSON.stringify(activeUser));
        //     $location.path("/userPage");
        //   }, function(err) {
        //     $scope.invalidLogin = true;
        // });
        $location.path("/userPage");
    };


    $scope.createAccount = function () {

        var modalInstance = $uibModal.open({
            templateUrl: "app/signUpModal/signUpModal.html",
            controller: "signUpModalCtrl"
        })
    };

});