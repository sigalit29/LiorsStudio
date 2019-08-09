app.controller("usersTableCtrl", function ($scope, $location, userSrv) {
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
});