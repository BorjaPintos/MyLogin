var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    //_id implicit: type: ObjectId, autogenerated, with index
    firstName: String,
	username: { type: String, index: {name : 'user_username_index',unique: true} },
	password: String,
	email: { type: String, index: {name : 'user_email_index', unique: true} },
    accountIdOauth2: String ,index: {name : 'user_accountIdOauth2_index', unique: true} },
    typeOauth2: String
});

exports.User = mongoose.model('User', UserSchema);
