
var i18nCustom = require('./i18nCustom');
/**
 * get /index
 */
exports.getIndex = function(req, res) {
	res.render('index', {languages : i18nCustom.getLanguagesAvaliables()});
};

/**
 * get /aboutMe
 */
exports.getAboutMe = function(req, res) {
	res.render('aboutMe', {languages : i18nCustom.getLanguagesAvaliables()});
};

/**
 * get /information
 */
exports.getInformation = function(req, res) {
	res.render('information', {languages : i18nCustom.getLanguagesAvaliables()});
};

/**
 * render 404 not found
 */
exports.notFound = function(req, res) {
    res.render('404', {languages : i18nCustom.getLanguagesAvaliables()}); 
};


