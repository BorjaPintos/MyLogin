var mongoose = require('mongoose');

exports.StorageUsersConnection = function MongoDbStorageUsers(url, protocol, dialect, user, pwd, host, port, dbName)
{
  'use strict';
 
  this.connect =
	  function connect() {
		  if (!MongoDbStorageUsers.connected){
            var options = {
              user: user,
              pass: pwd
            }
			MongoDbStorageUsers.connection=mongoose.connect(protocol+'://'+host+':'+port+'/'+dbName, options);
			MongoDbStorageUsers.connected=true;
		  	console.log('you have been connected successfully to '+ protocol+'://'+host+':'+port+'/'+dbName );
		  }
  }; 

};





