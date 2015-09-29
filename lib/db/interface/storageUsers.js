var	StorageUsersConnection = require('./storageUsersConnection').StorageUsersConnection; 

exports.StorageUsers = function InterfaceStorageUsers()
{
    'use strict';
 
    /*
    * Find one user by id.
    * params:
    * id, integer or String
    * callback (error, user).
    * if not found a user, callback(null, null)
    */
    this.findUserById =
	    function findUserById(id, callback) {
        };
  
    /*
    * Find one user by username.
    * params:
    * username: usually string
    * callback (error, user).
    * if not found a user, callback(null, null)
    */
    this.findOneUserByUsername =
	    function findOneUserByUsername(username, callback) {
	    };

    /*
    * Find one user by email.
    * params:
    * email: usually string
    * callback (error, user).
    * if not found a user, callback(null, null)
    */
    this.findOneUserByEmail =
	    function findOneUserByEmail(email, callback) {
	    };
	  
    /*
    * Create an user
    * params:
    * user: object with properties:
    *   {username : String,
         password : String, //encoded
         email : String,
         firtsName : String}
    * callback (error, user).
    */
    this.createUser =
	    function createUser(user, callback) {
	    };
    /*
    * Delete an user
    * params:
    * id
    * callback (error).
    * tipical error if not found user to delete: 'not found'
    */
    this.deleteUser =
        function deleteUser(id, callback) {
        };
    /*
    * Edit user, only we can edit email or firtsName
    * params:
    * userUpdate: object with properties:
    *   {_id : id,
         email : String,
         firtsName : String}
    * callback (error, user).
    * tipical error if not found user to update: 'not found'
    */
    this.updateUser =
	    function updateUser(userUpdate, callback) {
	    };
};
