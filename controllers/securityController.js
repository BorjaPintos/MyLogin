

/***
RESUME ERROR CODES
410 not autenticated
*/

exports.isAuthenticate = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    'use strict';
    if (req.isAuthenticated()){
	    return next();
    }// if the user is not authenticated then redirect him to 404 not found page
    res.redirect('404');
};

exports.isAuthenticatePost = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    'use strict';
    if (req.isAuthenticated()){
	    return next();
    }// if the user is not authenticated then send not logged
    res.send('410', 409);
};
