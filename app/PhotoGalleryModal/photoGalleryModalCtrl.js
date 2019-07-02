app.controller("photoGalleryModalCtrl", function ($scope, $location, $log, $uibModalInstance) {

    $scope.slides = [];
      
    $scope.cancelEdit = function () {
        $uibModalInstance.dismiss();
    }


    $scope.addSlide = function () {
      
        var newSlide = ({
            image: $scope.img.src,
            text: "new"
        });
        $uibModalInstance.close(newSlide);
    };

   
});