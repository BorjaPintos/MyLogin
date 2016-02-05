var LocalStrategy   = require('passport-local').Strategy,
    StorageUsers = require('../../../../lib/users/storageUsers').StorageUsers,
    crypt = require('../../../../lib/internal/crypt/crypt'),
    oauth2 = require('../oauth2/functionsOauth2').FunctionsOauth2;


/***
RESUME ERROR CODES
401 wrong password
404 user not found
409 email already in use
412 missing parameters
424 server Oauth2 not avaliable
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

            // check in database if a user with username exists or not
        	storageUsers.findOneUserByUsername(req.user.username,  function(err, user) {
                if (err){
                    console.log('Error in updateUser: '+err);
                    return done(err);
                }
                // already exists
                if (!user) {
                    return done(null, false, '404');  
                } else {
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        return done(null, false, '401'); 
                    } else {
                        if (user.typeOauth2 && user.accountIdOauth2 ){
                            var params = {
                                      accountIdOauth2 : user.accountIdOauth2,
                                      typeOauth2: user.typeOauth2, 
                                      loginCode: req.param('checkCode')
                            };
                            oauth2.check(params, function(err,success, info){
                                if (err){
                                    return done(err, info); //typical 424 or 412
                                }
                                if (success){
                                    updateUser(user, req, done);
                                } else {
                                    return done(null, false, '401') //fail oauth2
                                }
                            });       
                        } else {
                            console.log('User do not have oauth2:'); 
                            updateUser(user, req, done); 
                        }

                        
                    }

                }
            })
        }));

    var isValidPassword = function(user, password){
        return crypt.compare(password, user.password);
    }

    // Generates hash using bCrypt
    var createHash = function(password){
        return crypt.createHash(password);
    };

    var updateUser = function (user, req,  done){

        user.firstName = req.param('firstName');
        if (req.param('new-password')){
            user.password = createHash(req.param('new-password'));
        }

        if (user.email === req.param('email')){
             saveUser(user, req, done);
        } else {
            user.email = req.param('email');
            storageUsers.findOneUserByEmail(user.email, function(err, userEmail) {
                // already exists
                if (userEmail) {
                    return done(null, false, '409');
                } else {
                    saveUser(user, req, done);
                }                    
            });
        }
    }

    var saveUser = function(user, req, done){

        storageUsers.updateUser(user, function(err, us) {
            if (err){
                console.log('Error in Update user: '+err);  
                done(err, null);
            }  
            return done(null, us, '200');
        });
    }
}
