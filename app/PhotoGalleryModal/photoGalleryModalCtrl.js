app.controller("photoGalleryModalCtrl", function ($scope, $location, $log, $uibModalInstance) {

    $scope.slides = [];
    var currIndex;

    
    $scope.cancelEdit = function () {
        $uibModalInstance.dismiss();
    }


    $scope.addSlide = function () {
      
        var newSlide = ({
            image: $scope.img.src,
            text: "new",
            id: currIndex++
        });
        $uibModalInstance.close(newSlide);
    };

   
});