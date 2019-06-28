
app.factory("userSrv", function ($q) {

    var activeUser = null; // new User({id: 1, fname: "Nir" ...})
    var userIdCounter = 0;

    function User(YogaStudent) {
        this.id = YogaStudent.studentId;
        this.fname = YogaStudent.get("studentFirstName");
        this.lname = YogaStudent.get("studentLastName");
        this.email = YogaStudent.get("emaistudentEmaill");
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
        Parse.YogaStudent.logIn(email, pwd).then(function (user) {
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

    function addNewUser(fname,lname,email,pwd){
        var async = $q.defer();

        const YogaStudent = Parse.Object.extend('YogaStudent');
        const myNewObject = new YogaStudent();
        userIdCounter++;
        myNewObject.set('studentId', userIdCounter);
        myNewObject.set('studentFirstName', fname);
        myNewObject.set('studentLastName', lname);
        myNewObject.set('studentEmail', email);
        myNewObject.set('password',pwd);
    
        myNewObject.save().then(
            (result) => {
                async.resolve(new User(result));
                console.log('YogaStudent created', result);
            },
            (error) => {
                console.error('Error while creating YogaStudent: ', error);
                async.reject(error);
            }
        );
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