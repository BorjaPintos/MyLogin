var LocalStrategy   = require('passport-local').Strategy,
    StorageUsers = require('../../../../lib/users/storageUsers').StorageUsers,
    oauth2 = require('../oauth2/functionsOauth2').FunctionsOauth2,
    crypt = require('../../../../lib/internal/crypt/crypt');


/***
RESUME ERROR CODES
401 wrong password
402 pairToken not found
404 user not found
409 user already have oauth2
412 missing parameters
424 server Oauth2 not avaliable
*/

/***
RESUMEN SUCCESS CODES
200 pairLatch success
*/
module.exports = function(passport){

	'use strict';
	var storageUsers = StorageUsers.get(); 
	passport.use('pairOauth2', new LocalStrategy({
            passReqToCallback : true 
        }, 
        function(req, username, password, done) {
            // check in DataBase if a user with username exists or not
        	storageUsers.findOneUserByUsername(req.user.username,  function(err, user) {
                if (err){
                    console.log('Error in pair oauth2: '+err);
                    return done(err, null, '500');
                }
                // not exist
                if (!user) {
                    return done('404', false, 'user not found'); 
                } else {

                    if (!isValidPassword(user, password)){
                            return done('401', false, 'invalid password'); 
                    } else {
                        if (!user.accountIdOauth2){
                            if (req.param('pairToken') && req.param('typeOauth2')){
                                var params = {
                                    user: user,
                                    pairToken : req.param('pairToken'),
                                    typeOauth2 : req.param('typeOauth2')
                                };
                                oauth2.pair(params, function(err, accountIdOauth2, info){
                                    if (err){ 
                                        console.log(err);
                                        if (info) {
                                            done(info, null, info); //typical 424 , 402, or 412
                                        } else {
                                            done('500', null, info)
                                        }
                                    } else {
                                        user.accountIdOauth2 = accountIdOauth2;
                                        user.typeOauth2 = params.typeOauth2;
                                        saveUser(user, req, done);
                                    }
                                });
                            } else {
                                console.log('Missing parameters');  
                                done('412',null, 'Missing parameters'); 
                            }

                        } else {
                            console.log('User already have oauth2');  
                            done('409',  null, 'User already have oauth2');
                        }
                    }
                }
            })
        })
    );


    var saveUser = function(user, req, done){
        storageUsers.updateUser(user, function(err, us) {
            if (err){
                console.log('Error in pair oauth2: '+err);  
                done(err, null, '500');
            }  
            return done(null, us, '200');
        });
    }

    var isValidPassword = function(user, password){
        return crypt.compare(password, user.password);
    }
}
