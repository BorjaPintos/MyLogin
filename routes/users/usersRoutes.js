var securityController = require('../../controllers/securityController'),
    userController = require('../../controllers/userController'),
    oauth2Controller = require('../../controllers/oauth2Controller');

module.exports = function(app){
	'use strict';
    app.get('/login', userController.getLogin);
	app.post('/login', userController.login);
	app.get('/signup', userController.getSignup);
	app.post('/signup', userController.createUser);
	app.get('/home', securityController.isAuthenticate, userController.getHome);
	app.post('/home', securityController.isAuthenticatePost, userController.updateUser);
    app.post('/emailVerification', userController.emailVerification);
    app.post('/usernameVerification', userController.usernameVerification);
    app.post('/deleteUser', securityController.isAuthenticatePost, userController.deleteUser);
	app.post('/logout', userController.logout);
    app.post('/userTypeOauth2', userController.userTypeOauth2);
    app.post('/oauth2/pair', securityController.isAuthenticatePost, oauth2Controller.pair);
    app.post('/oauth2/unpair',  securityController.isAuthenticatePost, oauth2Controller.unpair);
	return app;
};





