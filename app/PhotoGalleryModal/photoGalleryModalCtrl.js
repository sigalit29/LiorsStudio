app.controller("photoGalleryModalCtrl", function ($scope, $location, $log, $uibModalInstance) {

    $scope.slides = [];
    $scope.userText = "";
    
    $scope.cancelEdit = function () {
        $uibModalInstance.dismiss();
    }


    $scope.addSlide = function () {
      
        var newSlide = ({
            image: $scope.img.src,
            text: $scope.userText
        });
        $uibModalInstance.close(newSlide);
    };

   
});