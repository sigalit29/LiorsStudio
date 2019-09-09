app.controller("userDeleteModalCtrl", function ($scope, $uibModalInstance, userToDel) {

  $scope.fullName = userToDel.fullName;


  $scope.deleteConfirmed = function () {
    $uibModalInstance.close(true);    
  }

  $scope.deleteCancelled = function () {
    $uibModalInstance.dismiss();
  }

     
});