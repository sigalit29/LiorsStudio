app.controller("userPageCtrl", function ($scope, $location, $uibModal, userSrv) {

    $scope.activeUser = userSrv.getActiveUser();
    $scope.userFname = $scope.activeUser.fname;
    $scope.multipleEntryTicket = false;

    $scope.updateUserData = function () {

        $scope.email = "";
        $scope.pwd = "";
        var modalInstance = $uibModal.open({
            templateUrl: "app/signUpModal/updateModal.html",
            controller: "updateModalCtrl"
        })

        modalInstance.result.then(function (User) {
            // this will wake in case the user added a new recipe
           console.log(User);
        }, function () {
            // this will wake up in case the user canceled the new recipe
            console.log("user canceled reset Password");
        })
    };

})