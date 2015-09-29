module.exports = function(){

	'use strict';
	//Users
	var dbUsers = require('./users/storageUsers').StorageUsers;
		dbUsers.connect();
	
};
