app.controller("homeCtrl", function ($scope, $location, $log, $uibModal, userSrv) {

    $scope.invalidLogin = false;
  
    $scope.email = "";
    $scope.pwd = "";
    
    $scope.users = [];

    /** If user is logged in Go to new page - user page on Home logo */
    if ($scope.invalidLogin == false) {
        //    $location.path("/userPage");
    }

    $scope.login = function () {

        userSrv.login($scope.email, $scope.pwd).then(function (activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/userPage");
        }, function (err) {
            $scope.invalidLogin = true;
            // scope.showLoginWindow = false;
        });

    };


    $scope.createAccount = function () {

        $scope.email = "";
        $scope.pwd = "";
        
        var modalInstance = $uibModal.open({
            templateUrl: "app/signUpModal/signUpModal.html",
            controller: "signUpModalCtrl"
        })


        modalInstance.result.then(function (newUser) {
            // this will wake in case the user added a new recipe
            $scope.users.push(newUser);
        }, function () {
            // this will wake up in case the user canceled the new recipe
            console.log("user canceled new signUp");
        })
    };

    $scope.newInputUser = function () {
        $scope.invalidLogin = false;
    }


});