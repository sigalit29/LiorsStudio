app.factory("weeklyActivitySrv", function ($q) {

    var weeklyActivityObj = null;


    class WeeklyActivity {
        constructor(parseWeekly) {
            this.parseWeeklyId = parseWeekly.id;
            this.weeklyUpdates = parseWeekly.get("WeeklyUpdates");
            this.weeklyImg = parseWeekly.get("WeeklyImage")._url;
        }
    }

    function UpdateWeeklyImage(newImage) {

        var async = $q.defer();

        const WeeklyActivity = Parse.Object.extend('WeeklyActivity');
        const query = new Parse.Query(WeeklyActivity);
        // here you put the objectId that you want to update
        query.get(weeklyActivityObj.parseWeeklyId).then((object) => {
            object.set('WeeklyImage', new Parse.File("ActivityImg.png", { base64: newImage }));

            object.save().then((response) => {
                console.log('Updated WeeklyActivity', response);
                weeklyActivityObj.weeklyImg = newImage;
                async.resolve(weeklyActivityObj);
            }, (error) => {
                console.error('Error while updating WeeklyActivity', error);
                async.reject(error);
            });
        });

        return async.promise;
    }


    function UpdateWeeklyText(newText) {

        var async = $q.defer();

        const WeeklyActivity = Parse.Object.extend('WeeklyActivity');
        const query = new Parse.Query(WeeklyActivity);
        // here you put the objectId that you want to update
        query.get(weeklyActivityObj.parseWeeklyId).then((object) => {
            object.set('WeeklyUpdates', newText);
            object.save().then((response) => {
                console.log('Updated WeeklyActivity', response);
                weeklyActivityObj.weeklyUpdates = newText;               
                async.resolve(weeklyActivityObj);
            }, (error) => {
                console.error('Error while updating WeeklyActivity', error);
                async.reject(error);
            });
        });

        return async.promise;
    }



    function getWeeklyData() {

        var async = $q.defer();

        const WeeklyActivityParse = Parse.Object.extend('WeeklyActivity');
        const query = new Parse.Query(WeeklyActivityParse);

        query.find().then((results) => {
            weeklyActivityObj = new WeeklyActivity(results[0]);
            async.resolve(weeklyActivityObj);
            console.log(`ParseObjects found: ${JSON.stringify(results)}`);
        }, (error) => {
            async.reject(error);
            console.error('Error while fetching WeeklyData', error);
        });

        return async.promise;
    }

    return {
        UpdateWeeklyImage: UpdateWeeklyImage,
        UpdateWeeklyText: UpdateWeeklyText,
        getWeeklyData: getWeeklyData
    }

});