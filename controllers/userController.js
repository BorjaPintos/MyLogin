var userModule = require('../lib/internal/users/userModule'),
    passport = require('passport'),
    i18nCustom = require('./i18nCustom');

/**
 * GET /login
 */
exports.getLogin = function(req, res){
    res.render('users/login', {languages : i18nCustom.getLanguagesAvaliables()});
};

/**
 * POST /signout
 */
exports.logout = function(req, res) {
	req.logout();
    res.send('200',200);
};

/**
 * GET /signup
 */
exports.getSignup = function(req, res){
    res.render('users/register',{languages : i18nCustom.getLanguagesAvaliables()});
};

/**
 * POST /login
 */
exports.login = function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if (err){
            console.log(err);
            res.send('500',500); //Internal Error
        } else {
            if (user){
                //autenticate user on passport session
                req.logIn(user, function(err) {
                    if (err) { //fail to login in passport session
                        console.log(err);
                        res.send('503',503);
                    }
                    res.send('200',200); //Successfull
                });
            } else {  
                //User or password wrong
                res.send(info,401);   
            }        
        }
    })(req, res, next);
};

/**
 * POST /signup
 */
exports.createUser = function(req, res, next) {

    var errors = userModule.validateUserParams(req.param('firstName'), req.param('email'), req.param('username'), req.param('password'));
    if (errors.length){
        res.send(errors,400); //it should be multiples erros
    } else {
        passport.authenticate('signup', function(err, user, info) {
            if (err){
                console.log(err);
                res.send('500',500); //Internal Error
            } else {
                if (user){
                    //autenticate user on passport session
                    req.logIn(user, function(err) {
                        if (err) { //fail to login in passport session
                            console.log(err);
                            res.send('503',500);
                        }
                        res.send('201',201); //Crate Successfull
                    });
                } else {  
                    //User already exists or Email exist
                    res.send(info,409);   
                }        
            } 
        })(req, res, next);
    } 
};

/**
 * GET /home
 */
exports.getHome = function(req, res){
    var userDetail = {
        username : req.user.username,
        email : req.user.email,
        firstName : req.user.firstName,
        typeOauth2 : req.user.typeOauth2 
    };
	res.render('home', { languages : i18nCustom.getLanguagesAvaliables() , userDetail: userDetail});
};

/**
 * POST /home
 */
exports.updateUser = function(req, res, next) {

    var errors = userModule.validateUserParams(req.param('firstName'), req.param('email'), req.param('username'), req.param('password'), req.param('new-password'));
    if (errors.length){
        res.send(errors,400); //it should be multiples erros
    } else {
        passport.authenticate('updateUser', function(err, user, info) {
            if (err){
                console.log(err);
                res.send('500',500); //Internal Error
            } else {
                if (user){
                    //autenticate user on passport session
                    req.logIn(user, function(err) {
                        if (err) { //fail to login in passport session
                            console.log(err);
                            res.send('503',500);
                        }
                        res.send('200',200); //Successfull
                    });
                } else {  
                    //Email exist, or wrong password
                    res.send(info, 400);   
                }        
            } 
        })(req, res, next); 
    }
};

/**
 * POST /delete
 */
exports.deleteUser = function(req, res, next) {
    //we only validate username, and password, so firts and second param are mocked 
    var errors = userModule.validateUserParams('none', 'none@none.none' , req.param('username'), req.param('password'));
    if (errors.length){
        res.send(errors,400); //it should be multiples erros
    } else {
        passport.authenticate('deleteUser', function(err, deleted, info) {
            if (err){
                console.log(err);
                res.send('500',500); //Internal Error
            } else {
                if (deleted){
                    //delete user from sesion
                    req.logout();
                    res.send('200',200);
                } else {  
                    //wrong password
                    res.send(info,401);   
                }        
            } 
        })(req, res, next); 
    }
};

/**
 * POST /emailVerification
 */
exports.emailVerification = function(req, res){
    userModule.emailVerification(req.param('email'), function(err, avaliable, message){
        if (err){
            console.log(err);
            res.send(500); //Internal Error
        } else {
            if (avaliable){
                res.send('200',200);
            } else {  
                res.send('409',409);   
            }        
        }
    });
};

/**
 * POST /usernameVerification
 */
exports.usernameVerification = function(req, res){
    userModule.usernameVerification(req.param('username'), function(err, avaliable, message){
        if (err){
            console.log(err);
            res.send(500); //Internal Error
        } else {
            if (avaliable){
                res.send('200',200);
            } else {  
                res.send('409',409);   
            }        
        }
    });
};

/**
 * POST /userTypeOauth2
 */
exports.userTypeOauth2 = function(req, res){

    var errors = userModule.validateUsername(req.param('username'));
    if (errors.length){
        res.send('409',409);   
    } else {
        userModule.userTypeOauth2(req.param('username'), function(err, typeOauth2, message){
            if (err){
                console.log(err);
                res.send(500); //Internal Error
            } else {
                if (typeOauth2){
                    res.send(typeOauth2,200);
                } else {  
                    res.send('409',409);   
                }        
            }
        });
    }
    

};


