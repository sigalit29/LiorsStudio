app.controller("homeCtrl", function ($scope, $location, $log, $uibModal, userSrv) {

    $scope.invalidLogin;
    $scope.showLoginWindow;
    $scope.showLogoutButton;
    $scope.email;
    $scope.pwd;
    $scope.activeUser = undefined;
    $scope.users = [];

    /** If user is logged in Go to new page - user page on Home logo */
    $scope.activeUser = userSrv.getActiveUser();

    if ($scope.activeUser) {
        $scope.showLoginWindow = false;
        $scope.showLogoutButton = true;
        
    } else {
        $scope.showLoginWindow = true;
        $scope.showLogoutButton = false;
    }

    $scope.login = function () {
        if ($scope.activeUser) {
              /** if user is loged in go to user page */
              $location.path("/userPage");
        }
        else {
            userSrv.login($scope.email, $scope.pwd).then(function (activeUser) {
                $log.info("Successful login with: " + JSON.stringify(activeUser));
                $location.path("/userPage");
                $scope.users.push(activeUser);
            }, function (err) {
                $scope.invalidLogin = true;
                $scope.activeUser = undefined;
            });
            
     
        }
    };

    $scope.logout = function () {
        userSrv.logout();
        /** reset display for new user input */
        $scope.showLoginWindow = true;
        $scope.showLogoutButton = false;
        $scope.invalidLogin = false;
        $scope.email ="";
        $scope.pwd = "";
        $scope.activeUser = undefined;
    }


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


    /** call this function to remove valus form email and pw */
    $scope.newInputUser = function () {
        $scope.invalidLogin = false;
    }


});