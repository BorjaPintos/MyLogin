var mongoose = require('mongoose'),
	User = require('../../../models/mongoose/user').User;

exports.StorageUsers = function MongoDbStorageUsers()
{
  'use strict';
 
    this.findUserById =
        function findUserById(id, callback) {
	        User.findById(id, callback);
        };
	  
    this.findOneUserByUsername =
        function findOneUserByUsername(username, callback) {
	        User.findOne({"username" : username}, callback);
        };

    this.findOneUserByEmail =
        function findOneUserByEmail(email, callback) {
	        User.findOne({"email" : email}, callback);
        };

    this.createUser =
	    function createUser(user, callback) {
	  
	        var newUser = new User();
	
            // set the user's local credentials
            newUser.username = user.username;
            newUser.password = user.password;
            newUser.email = user.email;
            newUser.firstName = user.firstName;

            newUser.save(callback);

        };

    this.deleteUser =
	    function deleteUser(id, callback) {
		    User.findByIdAndRemove(id, function(err){
                if (err){
                    callback(err);
                } else {
                    callback();
                }
            });
	    };

    this.updateUser =
	    function updateUser(userUpdate, callback) {
		    User.findById(userUpdate._id, function(err,user){
                if (err){
                    callback(err);
                } else {
                    if (user){
                        user.email = userUpdate.email;
                        user.firstName = userUpdate.firstName;
                        user.save(callback);
                    } else {
                        callback('not found');                    
                    }
                }
            });
	    };
};
