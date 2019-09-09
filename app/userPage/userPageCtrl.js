app.controller("userPageCtrl", function ($scope, $location, $uibModal, userSrv) {

    $scope.activeUser = userSrv.getActiveUser();
    $scope.userFname = $scope.activeUser.fname;
    $scope.isAdmin = $scope.activeUser.isAdmin;

    $scope.updateUserData = function () {
        $scope.email = "";
        $scope.pwd = "";
        var modalInstance = $uibModal.open({
            templateUrl: "app/signUpModal/updateModal.html",
            controller: "updateModalCtrl",
            resolve: {
                userData: function () {
                    return {
                        fname: $scope.activeUser.fname,
                        lname: $scope.activeUser.lname,
                        email: $scope.activeUser.email,
                        phone: $scope.activeUser.phone,
                        isOtherUser: false,
                        userId: $scope.activeUser.userId
                    };
                }
            }
        })

        modalInstance.result.then(function (User) {
            // this will wake in case the user saved his data 
            $scope.userFname = User.get("fname");
            $scope.activeUser.fname =  $scope.userFname;
            $scope.activeUser.lname = User.get("lname");
            $scope.activeUser.email = User.get("email");
            $scope.activeUser.phone = User.get("userPhone");
            console.log(User);
        }, function () {
            // this will wake up in case the user canceled the update
            console.log("user canceled update");
        })
    };

    $scope.GoToUsersTable = function () {
        $location.path("/usersTable");
    }

    $scope.goToHomePage = function () {
        $location.path("/");
    }

})