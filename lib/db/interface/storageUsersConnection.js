
exports.StorageUsersConnection = function InterfaceStorageUsers(url, protocol, dialect, user, pwd, host, port, dbName)
{
  'use strict';

  this.connect =
	  function connect() {
		  if (!InterfaceStorageUsersConnection.connected){
			//InterfaceStorageUsersConnection.StorageUsersConnection.connection=;
			InterfaceStorageUsersConnection.connected=true;
		  	console.log('you have been connected successfully to InterfaceDataBase');
		  }
  }; 

};





