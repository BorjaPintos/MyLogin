var LocalStrategy   = require('passport-local').Strategy,
    StorageUsers = require('../../../../lib/users/storageUsers').StorageUsers, 
    crypt = require('../../../../lib/internal/crypt/crypt'),   
    oauth2 = require('../oauth2/functionsOauth2').FunctionsOauth2;


/***
RESUME ERROR CODES
401 username or password wrong
412 missing parameters
424 server Oauth2 not avaliable
*/

/***
RESUMEN SUCCESS CODES
200 login success
*/
module.exports = function(passport){

	'use strict';
	var storageUsers = StorageUsers.get(); 
	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not
        	storageUsers.findOneUserByUsername(username, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        return done(err);
                    }
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        return done(null, false, '401');                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                            return done(null, false, '401'); 
                        // redirect back to login page
                    }
                    
                    if (user.accountIdOauth2){
                            //user have oauth2
                            var params = {
                                      accountIdOauth2 : user.accountIdOauth2,
                                      typeOauth2: user.typeOauth2, 
                                      checkCode: req.param('checkCode')
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
                                    return done(null, user,'200'); //oauth2 success
                                } else {
                                    return done(null, false, '401') //fail oauth2
                                }
                            });                     
                    } else {
                        // User and password both match, return user from done method
                        // which will be treated like success
                        return done(null, user,'200');
                    }
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return crypt.compare(password, user.password);
    }
    
}
