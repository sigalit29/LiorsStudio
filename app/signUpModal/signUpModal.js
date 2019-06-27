app.controller("signUpModalCtrl", function ($scope, $location, $log, $uibModalInstance) {

    $scope.animationsEnabled = true;

    $scope.ok = function () {
        
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    
});