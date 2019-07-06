app.factory("weeklyActivitySrv", function ($q) {

    class WeeklyActivity {
        constructor(parseWeekly) {
            this.parseWeeklyId = parseWeekly.id;
            this.weeklyUpdates = parseWeekly.get("WeeklyUpdates");
            this.weeklyImg = parseWeekly.get("WeeklyImage")._url;
        }
    }



    function UpdateWeeklyText() {

    }

    function UpdateWeeklyImage(newImage) {

    }

    function getWeeklyData() {

        var async = $q.defer();
        var WeeklyData;

        const WeeklyActivityParse = Parse.Object.extend('WeeklyActivity');
        const query = new Parse.Query(WeeklyActivityParse);

        query.find().then((results) => {
            WeeklyData = new WeeklyActivity(results[0]);

            async.resolve(WeeklyData);
            console.log(`ParseObjects found: ${JSON.stringify(results)}`);
        }, (error) => {
            async.reject(error);
            console.error('Error while fetching WeeklyData', error);
        });

        return async.promise;
    }



    return {
        UpdateWeeklyText: UpdateWeeklyText,
        UpdateWeeklyImage: UpdateWeeklyImage,
        getWeeklyData: getWeeklyData
    }

});