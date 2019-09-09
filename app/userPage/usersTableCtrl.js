app.controller("usersTableCtrl", function ($scope, $location, $uibModal, userSrv) {
    $scope.users = [];

    userSrv.getAllUsers().then(function (users) {
        $scope.users = users;
    });


    $scope.goToUserPage = function () {
        $location.path("/userPage");
    }

    $scope.goToHomePage = function () {
        $location.path("/");
    }

    $scope.goToUpdateUser = function (user) {
        $scope.email = "";
        $scope.pwd = "";
        var modalInstance = $uibModal.open({
            templateUrl: "app/signUpModal/updateModal.html",
            controller: "updateModalCtrl",
            resolve: {
                userData: function () {
                    return {
                        fname: user.fname,
                        lname: user.lname,
                        email: user.copyOfEmail,
                        phone: user.phone,
                        isOtherUser: true,
                        userId: user.userId
                    };
                }
            }
        })

        modalInstance.result.then(function (User) {
            // this will wake in case the user saved his data 
            console.log(User);
        }, function () {
            // this will wake up in case the user canceled the update
            console.log("user canceled update");
        })
    }

    $scope.goToDeleteUser = function (user) {
        /** open the delete slide modal */
        var modalInstance = $uibModal.open({
            templateUrl: "app/signUpModal/userDeleteModal.html",
            controller: "userDeleteModalCtrl",
            resolve: {
                userToDel: function () {
                    return user;
                }
            }
        })
        modalInstance.result.then(function (deleteWasConfirmed) {
            // this will wake in case the user deleted the current slide
            if (deleteWasConfirmed) {
                userSrv.deleteUser(user).then(function (response) {
                    console.log(response);
                    /**update table after deleting a user */
                    userSrv.getAllUsers().then(function (users) {
                        $scope.users = users;
                    });
                });

            }
        }, function () {
            // this will wake up in case the user canceled the update
            console.log("user canceled delete");
        })
    }

});