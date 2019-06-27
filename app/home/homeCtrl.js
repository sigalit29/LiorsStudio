app.controller("homeCtrl", function ($scope, $location, $log, $uibModal, userSrv) {

    $scope.invalidLogin = false;
    // $scope.email = "nir@nir.com";
    // $scope.pwd = "123";
    $scope.email = "";
    $scope.pwd = "";
    $scope.fname = "";
    $scope.lmane = "";
    $scope.users = [];


    $scope.login = function () {

        userSrv.login($scope.email, $scope.pwd).then(function(activeUser) {
            $log.info("Successful login with: " + JSON.stringify(activeUser));
            $location.path("/userPage");
          }, function(err) {
            $scope.invalidLogin = true;
        });
       
    };


    $scope.createAccount = function () {

        var modalInstance = $uibModal.open({
            templateUrl: "app/signUpModal/signUpModal.html",
            controller: "signUpModalCtrl"
        })

        modalInstance.result.then(function (newUser) {



            $scope.email;
            $scope.pwd ;
            $scope.fname;
            $scope.lmane;

            // this will wake in case the user added a new recipe
            $scope.users.push(newUser);
        }, function () {
            // this will wake up in case the user canceled the new recipe
            console.log("user canceled new signUp");
        })
    };

$scope.newInputUser = function()
{
    $scope.invalidLogin = false;
}


});