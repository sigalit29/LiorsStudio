app.controller("photoCaroselCtrl", function ($scope, $location, $log, $uibModalInstance) {

    $scope.animationsEnabled = true;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
   
    $scope.updateNewSettings = function () {

        var newSettings = ({
            myInterval: $scope.myInterval,
            noWrapSlides: $scope.noWrapSlides,
            randomize: $scope.shuffle
        });

        $uibModalInstance.close(newSettings);
    }

    $scope.cancelUpdate = function () {
        $uibModalInstance.dismiss();
    }

});