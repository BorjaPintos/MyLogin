var Sequelize = require('sequelize'),
    UserDefine = require('../../../models/sequelize/user').UserDefine;

var storageDefault;
var storage  = process.env.DATABASE_STORAGE || 'users.sqlite';

exports.StorageUsersConnection = function SqliteDbStorageUsers(url, protocol, dialect, user, pwd, host, port, dbName)
{
  'use strict';
 
  this.connect =
	  function connect() {
		  if (!SqliteDbStorageUsers.connected){

      var sequelize = new Sequelize(dbName, user, pwd,
          { dialect:  dialect,
            storage:  storage
          }      
        );
        // Import definition user table
        UserDefine(sequelize);
        // sequelize.sync() inicializa la bd
        sequelize.sync();

        SqliteDbStorageUsers.connection=sequelize;
			  SqliteDbStorageUsers.connected=true;
		  	console.log('you have been connected successfully to ' + storage);
		  }
  }; 

};





