app.controller("photoGalleryCtrl", function ($scope, $location, $uibModal, photoSlideSrv) {


  var slides = $scope.slides = [];
  var currIndex = $scope.currIndex = 0;

  $scope.activeSlide = 0;
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.isSlidesUpdatedFromParseDb = false;

  /** First time run get all gallary slides from the Parse DB (Back4app) */
  if (!$scope.isSlidesUpdatedFromParseDb) {
    photoSlideSrv.getSlides().then(function (ParseSlides) {
      for (let index = 0; index < ParseSlides.length; index++) {
        slides.push(ParseSlides[index]);
        $scope.currIndex = $scope.slides.length;
      }
      /**This get is done only once */
      $scope.isSlidesUpdatedFromParseDb = true;
    });
  }

  $scope.deleteItem = function (slideImg) {
    /** open the delete slide modal */
    var modalInstance = $uibModal.open({
      templateUrl: "app/PhotoGalleryModal/photoGalleryDelModal.html",
      controller: "photoGalleryDelModalCtrl",
      resolve: {
        image: function () {
          return slideImg;
        }
      }
    });

    modalInstance.result.then(function (deleteWasConfirmed) {
      // this will wake in case the user deleted the current slide
      if (deleteWasConfirmed) {
        console.info("slide was deleted", slideText);
        $scope.slides.splice(this.index, 1);
      }
    }, function () {
      // this will wake up in case the user canceled the carosel update
      console.log("user canceled delete");
    })
  };


  /** open the add new slide modal */
  $scope.openAddNewSlide = function () {
    var modalInstance = $uibModal.open({
      templateUrl: "app/PhotoGalleryModal/photoGalleryModal.html",
      controller: "photoGalleryModalCtrl"
    })
    modalInstance.result.then(function (newSlide) {
      // this will wake in case the user added a new slide      
      var max = getMaxIndex();
      newSlide.id = ++max;
      $scope.activeSlide = newSlide.id;
      photoSlideSrv.addNewSlide(newSlide).then(function (newSlide) {
        $scope.slides.push(newSlide);
      });
    }, function () {
      // this will wake up in case the user canceled the new slide
      console.log("user canceled add slide");
    })
  };



  /** open the carosel slide parameter settings modal */
  $scope.openGalleryCtrl = function () {
    var modalInstance = $uibModal.open({
      templateUrl: "app/PhotoGalleryModal/PhotoCaroselModal.html",
      controller: "photoCaroselCtrl"
    })
    modalInstance.result.then(function (newSettings) {
      // this will wake in case the user added a new setting for carosel
      $scope.myInterval = newSettings.myInterval;
      $scope.noWrapSlides = newSettings.noWrapSlides;
    }, function () {
      // this will wake up in case the user canceled the carosel update
      console.log("user canceled galley settings");
    })
  };

  // utilites
  function getMaxIndex() {
    var max = 0;
    for (var i = 0, l = slides.length; i < l; i++) {
      if (slides[i].id >= max) {
        max = slides[i].id;
      }
    }
    return (max);

  }


})