app.controller("photoGalleryModalCtrl", function ($scope, $location, $log, $uibModalInstance) {

    $scope.animationsEnabled = true;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.slides = [];
    var currIndex ;

    $scope.updateNewSettings = function() {    

        $uibModalInstance.close($scope.slides);
    }

    $scope.cancelUpdate = function () {
        $uibModalInstance.dismiss();
    }


    $scope.addSlide = function () {
        // var newWidth = 600 + slides.length + 1;
        // $scope.slides.push({
        //     image: "Images/P3010028.jpg",
        //     text: "Image 1",
        //     id: currIndex++
        //   });             
        var newSlide = ({
            image: $scope.img.src,
            text: "new",
            id: currIndex++
        });
        $uibModalInstance.close(newSlide);
    };

    $scope.randomize = function () {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    }

    // Randomize logic below

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


});