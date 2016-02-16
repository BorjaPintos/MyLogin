var Sequelize = require('sequelize'),
    UserDefine = require('../../../models/sequelize/user').UserDefine;

exports.StorageUsersConnection = function PostgresDbStorageUsers(url, protocol, dialect, user, pwd, host, port, dbName)
{
  'use strict';
 
  this.connect =
	  function connect() {
		  if (!PostgresDbStorageUsers.connected){

      var sequelize = new Sequelize(dbName, user, pwd,
              { dialect:  protocol,
                protocol: protocol,
                port:     port,
                host:     host,
                omitNull: false
        });
        // Import definition user table
        UserDefine(sequelize);
        // sequelize.sync() inicializa la bd
        sequelize.sync();

        PostgresDbStorageUsers.connection=sequelize;
			  PostgresDbStorageUsers.connected=true;
		  	console.log('you have been connected successfully to ' + protocol);
		  }
  }; 

};





