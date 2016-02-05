var LocalStrategy   = require('passport-local').Strategy,
    StorageUsers = require('../../../../lib/users/storageUsers').StorageUsers,
    crypt = require('../../../../lib/internal/crypt/crypt'),
    oauth2 = require('../oauth2/functionsOauth2').FunctionsOauth2;


/***
RESUME ERROR CODES
401 wrong password
404 username already in use
424 server Oauth2 not avaliable
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
            // check in database if a user with username exists or not
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
                    } else {
                        if (user.typeOauth2 && user.accountIdOauth2 ){
                            var params = {
                                      accountIdOauth2 : user.accountIdOauth2,
                                      typeOauth2: user.typeOauth2, 
                                      loginCode: req.param('checkCode')
                            };
                            oauth2.check(params, function(err,success, info){
                                if (err){ 
                                    console.log(err);
                                    if (info) {
                                        done(info, null, info); //typical 424 , 402, or 412
                                    } else {
                                        done('500', null, info)
                                    }
                                } else if (success){
                                    //unpair oauth2
                                    var params = {
                                            accountIdOauth2 : user.accountIdOauth2,
                                            typeOauth2 : user.typeOauth2
                                    }
                                    oauth2.unpair(params, function(err, info) {
                                        if (err){ 
                                            console.log(err);
                                            if (info) {
                                                done(info, null, info); //typical 424 , 402, or 412
                                            } else {
                                                done('500', null, info)
                                            }
                                        }  else {
                                            deleteUser(user, done);
                                        }
                                    });
                                } else {
                                    return done(null, false, '401') //fail oauth2
                                }
                            });       
                        } else {
                            console.log('User do not have oauth2:');
                            deleteUser(user,done);            
                        }
                        
                    }
                    
                }
            );
        }
    ));

    var isValidPassword = function(user, password){
        return crypt.compare(password, user.password);
    }

    var  deleteUser = function(user, done){
        storageUsers.deleteUser(user._id,function (err){
            if (err){
                console.log('Failed to delete user',err);
                return done(err, false);
            } else {
                return done(null, true, '200');
            }                    
        });
    }
}
