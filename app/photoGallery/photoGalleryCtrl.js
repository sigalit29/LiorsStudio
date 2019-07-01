app.controller("photoGalleryCtrl", function ($scope, $location, $log, $uibModal) {


  var slides = $scope.slides = [];
  var currIndex = 0;
  $scope.activeSlide = 0;

  $scope.slides.push({
    image: "Images/P3010028.jpg",
    text: "Image 1",
    id: currIndex++
  });

  $scope.slides.push({
    image: "Images/P3010063.jpg",
    text: "Image 2",
    id: currIndex++
  });

  $scope.slides.push({
    image: "Images/P3010064.jpg",
    text: "Image 3",
    id: currIndex++
  });

  $scope.openGalleryCtrl = function () {
    var modalInstance = $uibModal.open({
      templateUrl: "app/PhotoGalleryModal/photoGalleryModal.html",
      controller: "photoGalleryModalCtrl"
    })
    modalInstance.result.then(function (newSlide) {
      // this will wake in case the user added a new recipe
      newSlide.id = currIndex++; 
      $scope.activeSlide = newSlide.id;  
      $scope.slides.push(newSlide);  
    }, function () {
      // this will wake up in case the user canceled the new recipe
      console.log("user canceled galley settings");
    })
  };


})