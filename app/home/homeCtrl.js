app.controller("homeCtrl", function($scope, $location, $log) {

    $scope.invalidLogin = false;
    // $scope.email = "nir@nir.com";
    // $scope.pwd = "123";
    $scope.email = "";
    $scope.pwd = "";

    $scope.login = function() {

        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/userPage");
          }, function(err) {
            $scope.invalidLogin = true;
        });

    }

    $scope.createAccount= function() {
        
    }

})