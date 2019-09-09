Parse.Cloud.define("deleteUser", function (request, response) {
    var query = new Parse.Query(Parse.User);

    query.get(request.params.userId, { useMasterKey: true }).then(user => {
        user.destroy({ useMasterKey: true }).then(result => {
            response.success('User deleted');
        }).catch(error => {
            response.error(error);
        })

    }).catch(error => {
        response.error(error);
    });
});

Parse.Cloud.define("updateUserById", function (request, response) {
    var query = new Parse.Query(Parse.User);
    const fullName = request.params.username;
    const email = request.params.email;
    const fname = request.params.fname;
    const lname = request.params.lname;
    const phone = request.params.userPhone;

    query.equalTo("email", request.params.email);
    query.find({ useMasterKey: true }).then(function (results) {
        // Updates the data we want
        user.set('username', fullName);
        user.set('email', email);
        user.set('copyOfEmail', email);
        user.set('fname', fname );
        user.set('lname', lname);
        user.set('userPhone', phone);
        // Saves the user with the updated data
        user.save({ useMasterKey: true }).then((result) => {
            response.success('User updated');
        }).catch(error => {
            response.error(error);
        })
    });
});

