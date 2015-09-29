var securityController = require('../../controllers/securityController'),
    userController = require('../../controllers/userController');

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
	return app;
};





