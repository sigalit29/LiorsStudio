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
    var fullName = request.params.username;
    var email = request.params.email;
    var fname = request.params.fname;
    var lname = request.params.lname;
    var phone = request.params.userPhone;
    query.get(request.params.userId, { useMasterKey: true }).then(user => {
        // Updates the data we want
        user.set('username',fullName , { useMasterKey: true });
        user.set('email', email, { useMasterKey: true });
        user.set('copyOfEmail', email, { useMasterKey: true });
        user.set('fname', fname, { useMasterKey: true } );
        user.set('lname', lname, { useMasterKey: true });
        user.set('userPhone', phone, { useMasterKey: true });
        // Saves the user with the updated data     
        user.save(null,{useMasterKey:true}).then((result) => {
            response.success('User updated');
        }).catch(error => {
            response.error(error);
        })
    });
});

