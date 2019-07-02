app.factory("photoSlideSrv", function ($q) {


    class Slide {
        constructor(parseSlide) {
            this.parseSlideId = parseSlide.id;
            this.id = parseSlide.get("slideIndex");
            this.text = parseSlide.get("text");
            this.image = parseSlide.get("image")._url;
        }
    }


    function getSlides() {

        var async = $q.defer();
        var slides = [];

        const SlideParse = Parse.Object.extend('Slide');
        // Creates a new Query object to help us fetch MyCustomClass objects
        const query = new Parse.Query(SlideParse);
        // Executes the query, which returns an array of MyCustomClass
        query.find().then(results => {
            for (let index = 0; index < results.length; index++) {
                slides.push(new Slide(results[index]));
            }
            async.resolve(slides);
            console.log(`ParseObjects found: ${JSON.stringify(results)}`);
        }, (error) => {
            async.reject(error);
            console.error('Error while fetching Slide', error);
        });

        return async.promise;
    }

    function addNewSlide(slide) {
        var async = $q.defer();

        if (!slide.text) {
            text = "untiteled Image" + slideIndex;
        }
        // Preparing the new parse recipe object to save
        var SlideParse = Parse.Object.extend('Slide');
        var newSlid = new SlideParse();
        if( !slide.id)
        {
            console.error('the new slide has no id put 1 as defult');
            slide.id = 1; 
        }
        newSlid.set('slideIndex', slide.id);
        newSlid.set('text', slide.text);
        newSlid.set('image', new Parse.File("userImg" + slide.id + ".jpg", { base64: slide.image }));

        // Actual saving the new slide in Parse
        newSlid.save().then(
            function (result) {
                console.log('slide created', result);
                async.resolve(new Slide(result));
            },
            function (error) {
                console.error('Error while creating slide: ', error);
                async.reject(error);
            }
        );
        return async.promise;
    }

    return {
        addNewSlide: addNewSlide,
        getSlides: getSlides
    }

});