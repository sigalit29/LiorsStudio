app.controller("workshopsCtrl", function($scope, $rootScope, $location, $log, userSrv) {

   
    userSrv.clearWorkshopAlert().then(function (newWorkshopAlertOn) {
        $rootScope.isNew = '';
        $log.info("Clearing the blinking and new icon from menu after user enters the workshop page");
    });


})
