// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// MySql DATABASE_URL = mysql://user:passwd@host:port/database
// Mongodb DATABASE_URL = mongodb://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var urlDefault = 'sqlite://:@:/';
var url = (process.env.DATABASE_URL || urlDefault).match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/),
    protocol = (url[1]||null),
    dialect  = (url[1]||null),
    user     = (url[2]||null),
    pwd      = (url[3]||null),
    host     = (url[4]||null),
    port     = (url[5]||null),
    dbName  = (url[6]||null);

var protocolsImpl = {
    'mongodb' : { 
                'connection' : '../db/mongodb/storageUsersConnection',
                'storageUsers' : '../db/mongodb/storageUsers'
                },
     'sqlite' : { 
                'connection' : '../db/sqlite/storageUsersConnection',
                'storageUsers' : '../db/sqlite/storageUsers'
                },
     'postgres' : { 
                'connection' : '../db/postgres/storageUsersConnection',
                'storageUsers' : '../db/postgres/storageUsers'
                }
};


var StorageUsers = exports.StorageUsers = function StorageUsers()
{
	var connection;
};

StorageUsers.get = function ()
{
	'use strict';

	try {
		var StorageUsers = require(protocolsImpl[protocol]['storageUsers']).StorageUsers;
        if (!StorageUsers){
            throw new Error('Unknown storage protocol "'+protocol+'"');
        }
	 	return new StorageUsers();
	} catch (e) {
	 	console.error(protocol  + e);
	 	throw new Error('Could not instantiate ' + protocol +' backend');
	}   

};

StorageUsers.connect = function ()
{
	'use strict';

    try {
		var StorageUsersConnection = require(protocolsImpl[protocol]['connection']).StorageUsersConnection;
        if (!StorageUsersConnection){
            throw new Error('Unknown storage protocol "'+protocol+'"');
        }
		var userConnection = new StorageUsersConnection(url, protocol, dialect, user, pwd, host, port, dbName);
		userConnection.connect();
	} catch (e) {
		console.error(protocol + e);
	 	throw new Error('Could not instantiate ' + protocol +' backend');
	}   

};
