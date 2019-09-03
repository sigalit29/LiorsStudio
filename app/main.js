Parse.Cloud.define("deleteUser", function (request, response) {
    var query = new Parse.Query(Parse.User);
    
    query.get(request.params.userId, {useMasterKey:true}).then(user=>{
        user.destroy({useMasterKey:true}).then(result=>{
            response.success('User deleted');
        }).catch(error=>{
            response.error(error);
        })
 
    }).catch(error=>{
        response.error(error);
    });
});

