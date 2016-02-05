var passport = require('passport'),
    i18nCustom = require('./i18nCustom');

/**
 * POST /oauth2/pair
 */
exports.pair = function(req, res, next){
    passport.authenticate('pairOauth2', function(err, user, info) {
            if (err){
                if (err === '402'){
                    res.send('402',402); //invalid pairToken
                } else {
                    res.send('500',500); //Internal Error
                }
            } else {
                if (user){
                    res.send('201',201); //pairLatch Successfull
                } else {  
                    //User not found
                    res.send(info,404);   
                }        
            } 
    })(req, res, next);
};

/**
 * POST /oauth2/unpair
 */
exports.unpair = function(req, res, next) {
    passport.authenticate('unpairOauth2', function(err, user, info) {
            if (err){
                res.send('500',500); //Internal Error
            } else {
                if (user){
                    res.send('201',201); //unpairLatch Successfull
                } else {  
                    //User not found
                    res.send(info,404);   
                }        
            } 
    })(req, res, next);
};






