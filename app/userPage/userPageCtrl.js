app.controller("userPageCtrl", function ($scope, $location, $log, userSrv) {

    $scope.activeUser = userSrv.getActiveUser();
    $scope.userFname = $scope.activeUser.fname;

})