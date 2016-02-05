var basic = require('./basic/basic'),
    StorageUsers = require('../../../lib/users/storageUsers').StorageUsers; 


module.exports = function(passport){

	'use strict';
	var storageUsers = StorageUsers.get(); 
	// Passport needs to be able to serialize and deserialize
	//users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        //console.log('serializing user: ',user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
    	storageUsers.findUserById(id, function(err, user) {
            //console.log('deserializing user:',user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login, SignUp/Registration and Delete
    basic(passport);

};
