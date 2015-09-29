var StorageUsers = require('../../../lib/users/storageUsers').StorageUsers; 


/***
RESUME ERROR CODES:

601 - Enter a valid Name
602 - Name.length > 3 and < 255
603 - Enter a valid email
604 - email.length < 255
605 - Enter a valid UserName
606 - Username.length > 3 and < 255
607 - Enter a valid Password
608 - Password.length > 6 and < 255

***/

var storageUsers = StorageUsers.get(); 

exports.emailVerification = function(email, callback){
	storageUsers.findOneUserByEmail(email, function(err, user) {
        if (err){
            return callback(err);
        }
        // already exists
        if (user) {
            console.log('User already exists with email: ' + email);
            return callback(null, false); //email not avaliable
        } else {
            console.log('User not found with email: ' + email);
            return callback(null, true); //email avaliable
        }   
    });
}

exports.usernameVerification = function(username, callback){
	storageUsers.findOneUserByUsername(username, function(err, user) {
        if (err){
            return callback(err);
        }
        // already exists
        if (user) {
            return callback(null, false); //email not avaliable
        } else {
            return callback(null, true); //email avaliable
        }   
    });
}

exports.validateUserParams = function(firstname, email, username, password){

    var errors = [],
        error;
    error = validateFirstName(firstname);
    if (error){
        errors.push(error);
    }
    error = validateEmail(email);
    if (error){
        errors.push(error);
    }
    error = validateUsername(username);
    if (error){
        errors.push(error);
    }
    error = validatePassword(password);
    if (error){
        errors.push(error);
    }
    return errors;
}


/**
601 - Enter a valid Name
602 - Name.length > 3 and < 255
*/
var validateFirstName = function(name){
    if (typeof(name)!='string'){
        return "601";
    }
    if (name.length < 3 || name.length > 255){
        return "602";
    }

};

/**
603 - Enter a valid email
604 - email.length < 255
*/
var validateEmail = function(email){
    if (typeof(email)!='string'){
        return "603";
    }
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)){
        return "603";
    }
    if (email.length > 255){
        return "604";
    }
};

/**
605 - Enter a valid UserName
606 - Username.length > 3 and < 255
*/
var validateUsername = function(username){
    if (typeof(username)!='string'){
        return "605";
    }
    if (username.length < 3 || username.length > 255){
        return "606";
    }
};

/**
607 - Enter a valid Password
608 - Password.length > 6 and < 255
*/
var validatePassword = function(password){
    if (typeof(password)!='string'){
        return "607";
    }
    if (password.length < 6 || password.length > 255){
        return "608";
    }
};

