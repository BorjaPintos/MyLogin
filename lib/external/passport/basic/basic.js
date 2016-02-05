var login = require('./login'),
    signup = require('./signup'),
    deleteUser = require('./deleteUser'),
    updateUser = require('./updateUser'),
    pairOauth2 = require('./pairOauth2'),
    unpairOauth2 = require('./unpairOauth2'),
    initOauth2 = require('../oauth2/initOauth2');
       
module.exports = function(passport){
    login(passport);
    signup(passport);
    updateUser(passport);
    deleteUser(passport);
    pairOauth2(passport);
    unpairOauth2(passport);
    initOauth2();
}
