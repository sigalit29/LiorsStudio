app.controller("photoGalleryCtrl", function ($scope, $location, $log, $uibModal) {


  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.activeSlide = 0;
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;

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
  /** open the add new slide modal */
  $scope.openAddNewSlide = function () {
    var modalInstance = $uibModal.open({
      templateUrl: "app/PhotoGalleryModal/photoGalleryModal.html",
      controller: "photoGalleryModalCtrl"
    })
    modalInstance.result.then(function (newSlide) {
      // this will wake in case the user added a new slide
      newSlide.id = currIndex++;
      $scope.activeSlide = newSlide.id;
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
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }


})