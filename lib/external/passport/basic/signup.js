var LocalStrategy   = require('passport-local').Strategy,
    StorageUsers = require('../../../../lib/users/storageUsers').StorageUsers,
    crypt = require('../../../../lib/internal/crypt/crypt');


/***
RESUME ERROR CODES
409 username already in use
409.1 email already in use
*/

/***
RESUMEN SUCCESS CODES
201 create User success
*/
module.exports = function(passport){

	'use strict';
	var storageUsers = StorageUsers.get(); 
	passport.use('signup', new LocalStrategy({
            passReqToCallback : true 
            // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            var findOrCreateUser = function(){
                
            	storageUsers.findOneUserByEmail(req.param('email'), function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+ err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with email: ' + req.param('email'));
                        return done(null, false, '409.1');
                    } else {
                        storageUsers.findOneUserByUsername(username, function(err, us) {
                            // already exists
                            if (us) {
                                console.log('User already exists with username: ' + username);
                                return done(null, false, '409');
                            } else {
                                // save the user
                                var newUser={};
                                newUser.firstName = req.param('firstName');
                                newUser.email = req.param('email');
                                newUser.username = username;
                                newUser.password = createHash(password);
                                storageUsers.createUser(newUser, function(err, userNew) {
                                    if (err){
                                        console.log('Error in Saving user: '+err);  
                                        done(err, false );
                                    }
                                    console.log('User Registration succesful');    
                                    return done(null, userNew, '201');
                                });
                            }
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return crypt.createHash(password);
    };

	


};
