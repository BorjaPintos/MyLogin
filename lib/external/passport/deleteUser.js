var LocalStrategy   = require('passport-local').Strategy,
    StorageUsers = require('../../../lib/users/storageUsers').StorageUsers,
    crypt = require('../../../lib/internal/crypt/crypt');


/***
RESUME ERROR CODES
401 wrong password
404 username already in use
*/

/***
RESUMEN SUCCESS CODES
200 delete User success
*/
module.exports = function(passport){

	'use strict';
	var storageUsers = StorageUsers.get(); 
	passport.use('deleteUser', new LocalStrategy({
            passReqToCallback : true 
            // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
        	storageUsers.findOneUserByUsername(username, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in error: '+err);
                        return done(err);
                    }
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, '404');                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false,'401'); 
                        // redirect back to login page
                    }
                    // User and password both match, delete user
                    storageUsers.deleteUser(user._id,function (err){
                        if (err){
                            console.log('Failed to delete user',err);
                            return done(err, false);
                        } else {
                            return done(null, true, '200');
                        }                    
                    });
                    
                }
            );
        }
    ));

    var isValidPassword = function(user, password){
        return crypt.compare(password, user.password);
    }
}
