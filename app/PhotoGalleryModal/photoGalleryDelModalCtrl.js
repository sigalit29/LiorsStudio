app.controller("photoGalleryDelModalCtrl", function ($scope, $log, $uibModalInstance, image) {

  $scope.imgToDelete = image;


  $scope.deleteConfirmed = function () {
    $uibModalInstance.close(true);    
  }

  $scope.deleteCancelled = function () {
    $uibModalInstance.dismiss();
  }

     
});