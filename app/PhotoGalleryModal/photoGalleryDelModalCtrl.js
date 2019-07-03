app.controller("photoGalleryDelModalCtrl", function ($scope, $log, $uibModalInstance) {


  $scope.deleteConfirmed = function () {
    $uibModalInstance.close(true);    
  }

  $scope.deleteCancelled = function () {
    $uibModalInstance.dismiss();
  }

     
});