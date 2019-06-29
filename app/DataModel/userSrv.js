
app.factory("userSrv", function ($q) {

    var activeUser = null; // new User({id: 1, fname: "Nir" ...})
    var userIdCounter = 0;

    // { User object in yogaStudio DB - Back4App
    //     "objectId": "4BwpMWdCnm",
    //     "username": "A string",
    //     "email": "A string",
    //     "fname": "A string",
    //     "lname": "A string",
    //     "password": "#Password123",
    //   }

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

    function addNewUser(fname, lname, email, pwd) {
        var async = $q.defer();
        var fullName = fname + ' ' + lname;

        const user = new Parse.User()
        user.set('username', fullName);
        user.set('fname', fname);
        user.set('lname', lname);
        user.set('email', email);
        user.set('password', pwd);

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


    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getActiveUser: getActiveUser,
        addNewUser: addNewUser
    }

});