app.controller("photoGalleryCtrl", function ($scope, $location, $log, $uibModal, photoSlideSrv) {


  $scope.slides = [];
  $scope.currIndex = 1;

  $scope.activeSlide = 1;
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.isSlidesUpdatedFromParseDb = false;

  /** First time run get all gallary slides from the Parse DB (Back4app) */
  if (!$scope.isSlidesUpdatedFromParseDb) {
    photoSlideSrv.getSlides().then(function (ParseSlides) {
      $scope.slides = ParseSlides;
      // if (ParseSlides.length) {
      //   $scope.activeSlide = ParseSlides[0].id;
      // }
      /**This get is done only once */
      $scope.isSlidesUpdatedFromParseDb = true;
    });
  }

  /** open the add new slide modal */
  $scope.openAddNewSlide = function () {
    var modalInstance = $uibModal.open({
      templateUrl: "app/PhotoGalleryModal/photoGalleryModal.html",
      controller: "photoGalleryModalCtrl"
    })
    modalInstance.result.then(function (newSlide) {
      // this will wake in case the user added a new slide
      newSlide.id = $scope.currIndex++;
      $scope.activeSlide = newSlide.id;
      if (!newSlide.id) {
        $log.error(" new slide id was not updated", newSlide.id);
      }
      photoSlideSrv.addNewSlide(newSlide).then(function (newSlide) {
        $uibModalInstance.close(newSlide);
      });

      $scope.slides.push(newSlide);
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



  $scope.randomize = function () {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
    $scope.noWrapSlides = false;

  }


  // Randomize logic below

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = $scope.slides.length; i < l; i++) {
      $scope.slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < $scope.currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }


})