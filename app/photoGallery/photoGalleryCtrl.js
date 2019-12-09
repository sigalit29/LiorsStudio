app.controller("photoGalleryCtrl", function ($scope, $location, $uibModal, photoSlideSrv, userSrv) {

  $scope.activeUser = userSrv.getActiveUser();
  if($scope.activeUser){
    $scope.isAdmin = $scope.activeUser.isAdmin;
  }
  else{
    $scope.isAdmin = false;
  }

  var slides = $scope.slides = [];
  $scope.currIndex = 0;

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

      IndexTheSlideArray(slides);
      /**This get is done only once */
      $scope.isSlidesUpdatedFromParseDb = true;
    });
  }

  $scope.deleteItem = function (slideImg, slide) {
    /** open the delete slide modal */
    var modalInstance = $uibModal.open({
      templateUrl: "app/PhotoGalleryModal/photoGalleryDelModal.html",
      controller: "photoGalleryDelModalCtrl",
      resolve: {
        image: function () {
          return slideImg;
        }
      }
    })
    modalInstance.result.then(function (deleteWasConfirmed) {
      // this will wake in case the user deleted the current slide
      if (deleteWasConfirmed) {
        $scope.slides.splice(slide.id, 1);
        photoSlideSrv.deleteSlide(slide).then(function (res) {
          console.log("user deleted slide", res);
        });
      }
    }, function () {
      // this will wake up in case the user canceled the update
      console.log("user canceled delete");
    })
    IndexTheSlideArray(slides);
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
      photoSlideSrv.addNewSlide(newSlide, newSlide.id).then(function (newSlide) {
        $scope.slides.push(newSlide);
        IndexTheSlideArray(slides);
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
  function IndexTheSlideArray(slides) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = i;
    }
    $scope.activeSlide = slides.length - 1;
  }


  function getMaxIndex() {
    var max = 0;
    for (var i = 0, l = slides.length; i < l; i++) {
      if (slides[i].id >= max) {
        max = slides[i].id;
      }
    }
    return (max);

  }

  $scope.goToHomePage = function () {
    $location.path("/");
  }


})