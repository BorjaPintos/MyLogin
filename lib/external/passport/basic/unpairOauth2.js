var LocalStrategy   = require('passport-local').Strategy,
    StorageUsers = require('../../../../lib/users/storageUsers').StorageUsers,
    oauth2 = require('../oauth2/functionsOauth2').FunctionsOauth2,
    crypt = require('../../../../lib/internal/crypt/crypt');

/***
RESUME ERROR CODES
401 wrong password
404 user not found
409 oauth2 on user not found
424 Servidor Oauth2 no disponible
*/

/***
RESUMEN SUCCESS CODES
200 unpairLatch success
*/
module.exports = function(passport){

	'use strict';
	var storageUsers = StorageUsers.get(); 
	passport.use('unpairOauth2', new LocalStrategy({
            passReqToCallback : true
        }, 
        function(req, username, password, done) {

            // check in DataBase if a user with username exists or not
        	storageUsers.findOneUserByUsername(req.user.username,  function(err, user) {
                if (err){
                    console.log('Error in unpairLatch: '+err);
                    return done(err);
                }
                // not exist
                if (!user) {
                    return done(null, false, '404');  
                } else {

                    if (!isValidPassword(user, password)){
                            return done(null, false, '401'); 
                    } else {
                        if (user.typeOauth2 && user.accountIdOauth2 ){
                            var params = {
                                      accountIdOauth2 : user.accountIdOauth2,
                                      typeOauth2: user.typeOauth2, 
                                      checkCode: req.param('checkCode')
                            };
                            oauth2.check(params, function(err,success, info){
                                if (err){ 
                                    console.log(err);
                                    if (info) {
                                        done(info, null, info); //typical 424 , 412
                                    } else {
                                        done('500', null, info)
                                    }
                                } else if (success){
                                    var params = {
                                        accountIdOauth2 : user.accountIdOauth2,
                                        typeOauth2 : user.typeOauth2
                                    }
                                    oauth2.unpair(params, function(err, info) {
                                        if (err){ 
                                            console.log(err);
                                            if (info) {
                                                done(info, null, info); //typical 424 , 412
                                            } else {
                                                done('500', null, info)
                                            }
                                        } else {
                                            user.accountIdOauth2 = null;
                                            user.typeOauth2 = null;
                                            saveUser(user, req, done);
                                        }
                                    });
                                } else {
                                    return done('401', false, 'fail check') //fail check
                                }
                            });  

                        } else {
                            console.log('User do not have oauth2:');  
                            done('409', null, 'User do not have oauth2:');
                        }
                    }
                }
            })
        })
    );


    var saveUser = function(user, req, done){
        storageUsers.updateUser(user, function(err, us) {
            if (err){
                console.log('Error in unpairLatch: '+err);  
                done(err, null, '500');
            }  
            return done(null, us, '200');
        });
    }

    var isValidPassword = function(user, password){
        return crypt.compare(password, user.password);
    }
}
