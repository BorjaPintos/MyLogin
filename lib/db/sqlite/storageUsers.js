var User = require('../../../models/sequelize/user').User;

exports.StorageUsers = function SqliteDbStorageUsers()
{
  'use strict';
 
    this.findUserById =
        function findUserById(id, callback) {
	        User.find({
                    where: {
                        _id: id
                    }
              }).then(function(user) {
                  if (user) {
                    callback(null, user);
                  } else { callback();}
            }).catch(function(error) { callback(error);});
        };
	  
    this.findOneUserByUsername =
        function findOneUserByUsername(username, callback) {
	        	  User.find({
                    where: {
                        username: String(username)
                    }
              }).then(function(user) {
              if (user) {
                callback(null, user)
              } else { callback();}
            }
          ).catch(function(error) { callback(error);});
        };

    this.findOneUserByEmail =
        function findOneUserByEmail(email, callback) {
	        	  User.find({
                    where: {
                        email: String(email)
                    }
              }).then(function(user) {
              if (user) {
                callback(null, user);
              } else { callback();}
            }
          ).catch(function(error) { callback(error);});
      };

    this.createUser =
	    function createUser(user, callback) {
        var newUser = User.build(
          { username: user.username, 
            password: user.password, 
            email : user.email, 
            firstName : user.firstName}
        );
        newUser.validate().then(
            function (err){
                if (err){
                    callback(null, 'validation error');
                } else {
                    newUser.save()
                      .then( function(){ 
                            callback(null, newUser);
                        }) 
                      .catch(function(error){
                          callback(null, error);
                      });
                }
            }
        ).catch(function(error){callback(null, error);});
    };

    this.deleteUser =
	    function deleteUser(id, callback) {
          User.find({
                where: {
                    _id: id
                }
              }).then(function(user) {
              if (user) {
                user.destroy().then( function() {
                callback();
              }).catch(function(error){callback(error)});
              } else { callback('not found')}
            }
          ).catch(function(error) { callback(error);});
	    };

    this.updateUser =
	    function updateUser(userUpdate, callback) {
          User.find({
                where: {
                    _id: userUpdate._id
                }
           }).then(function(user) {
              if (user){
                user.email = userUpdate.email;
                user.firstName = userUpdate.firstName;
                user.validate().then(
                    function(err){
                        if (err) {
                            callback('validation error');
                        } else {
                            user.save()
                              .then( function(){ callback(null, user);}) 
                              .catch(function(error){
                                  callback(error);
                              });
                        }
                    }
                ).catch(function(error) { callback(error);});;
              } else {callback('not found');}
          }).catch(function(error) { callback(error);});
	    };

};
