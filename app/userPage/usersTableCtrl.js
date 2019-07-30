app.controller("usersTableCtrl", function ($scope, $location, userSrv) {
    $scope.users=[];

    userSrv.getAllUsers().then(function (users) {
        $scope.users=users;
    });
    
});