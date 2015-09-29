var indexController = require('../controllers/indexController');

module.exports = function(app){
	'use strict';
	app.get('/', indexController.getIndex);
    app.get('/aboutMe', indexController.getAboutMe);
    app.get('/information', indexController.getInformation);
	app.get('*', indexController.notFound);

	return app;
};





