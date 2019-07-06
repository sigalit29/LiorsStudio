
app.factory("userSrv", function ($q) {

    var activeUser = null;
    
    function User(user) {
        this.usertId = user.id;
        this.fullName = user.get("username");
        this.fname = user.get("fname");
        this.lname = user.get("lname");
        this.email = user.get("email");
    }


    function isLoggedIn() {
        return activeUser ? true : false;
    }

    // login will check if the user and password exists. If so it will update the active user 
    // variable and will return it
    function login(email, pwd) {
        var async = $q.defer();

        activeUser = null;
        
        // Pass the username and password to logIn function
        Parse.User.logIn(email, pwd).then(function (user) {
            // Do stuff after successful login
            console.log('Logged in user', user);
            activeUser = new User(user);
            async.resolve(activeUser);
        }).catch(error => {
            console.error('Error while logging in user', error);
            async.reject(error);
        });

        return async.promise;
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }


    /*-- Add new user service   -*/
    function addNewUser(fname, lname, email, pwd, phone) {
        var async = $q.defer();
        var fullName = fname + ' ' + lname;

        const user = new Parse.User()
        user.set('username', fullName);
        user.set('fname', fname);
        user.set('lname', lname);
        user.set('email', email);
        user.set('password', pwd);
        user.set('userPhone', phone);

        user.signUp().then((user) => {
            activeUser = new User(user);
            async.resolve(activeUser);
            console.log('User signed up', user);
        }).catch(error => {
            console.error('Error while signing up user', error);
            async.reject(error);
        });
        return async.promise;
    }

    /*-- Reset PW service   -*/
    function resetPassword(email, pwd) {
        var async = $q.defer();
        function resetPassword() {
            Parse.User.requestPasswordReset(email).then(function() {
              console.log("Password reset request was sent successfully");
              async.resolve(activeUser);
            }).catch(function(error) {
              console.log("The login failed with error: " + error.code + " " + error.message);
              async.reject(error);
            });
        }
     
        return async.promise;
    }



    /*-- update exsisting user data service   -*/
    function updateUser(fname, lname, email, phone) {
        var async = $q.defer();
        var fullName = fname + ' ' + lname;

        const User = new Parse.User();
        const query = new Parse.Query(User);

        if (isLoggedIn()) {
            // Finds the user by its ID
            query.get(activeUser.usertId).then((user) => {
                // Updates the data we want
                user.set('username', fullName);
                user.set('email', email);
                user.set('fname', fname);
                user.set('lname', lname);
                user.set('userPhone', phone);
                // Saves the user with the updated data
                user.save().then((response) => {
                    console.log('Updated user', response);
                    async.resolve(response);
                }).catch((error) => {
                    console.error('Error while updating user', error);
                    async.reject(error);

                });
            });
        }
        return async.promise;
    }


    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getActiveUser: getActiveUser,
        addNewUser: addNewUser,
        updateUser: updateUser,
        resetPassword: resetPassword
    }

});