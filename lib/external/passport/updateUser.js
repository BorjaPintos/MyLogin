var LocalStrategy   = require('passport-local').Strategy,
    StorageUsers = require('../../../lib/users/storageUsers').StorageUsers,
    crypt = require('../../../lib/internal/crypt/crypt');


/***
RESUME ERROR CODES
401 wrong password
404 user not found
409 email already in use
*/

/***
RESUMEN SUCCESS CODES
200 update User success
*/
module.exports = function(passport){

	'use strict';
	var storageUsers = StorageUsers.get(); 
	passport.use('updateUser', new LocalStrategy({
            passReqToCallback : true 
            // allows us to pass back the entire request to the callback
        }, 
        function(req, username, password, done) {

            // check in mongo if a user with username exists or not
        	storageUsers.findOneUserByUsername(username,  function(err, updateUser) {
                if (err){
                    console.log('Error in updateUser: '+err);
                    return done(err);
                }
                // already exists
                if (!updateUser) {
                    return done(null, false, '404');  
                } else {
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(updateUser, password)){
                        return done(null, false, '401'); 
                    }
                    updateUser.firstName = req.param('firstName');
                    if (updateUser.email === req.param('email')){
                         saveUser(updateUser, req, done);
                    } else {
                        updateUser.email = req.param('email');
                        storageUsers.findOneUserByEmail(updateUser.email, function(err, user) {
                            // already exists
                            if (user) {
                                return done(null, false, '409');
                            } else {
                                saveUser(updateUser, req, done);
                            }                    
                        });
                    }
                }
            })
        }));

    var isValidPassword = function(user, password){
        return crypt.compare(password, user.password);
    }

    var saveUser = function(updateUser, req, done){
        storageUsers.updateUser(updateUser, function(err, us) {
            if (err){
                console.log('Error in Update user: '+err);  
                done(err, null);
            }  
            return done(null, us, '200');
        });
    }
}
