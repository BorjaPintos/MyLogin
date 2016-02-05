var authy = require('./authy').getInstance();


/**ERROR CODES
412 missing parameters
424 server Oauth2 not avaliable
*/
/*params = object like this:
*{ 
*  accountIdOauth2
*}
*callback(err)
*/
exports.Oauth2UnpairImpl = function Oauth2UnpairImpl(params, callback){
    if (!params.accountIdOauth2){
        return callback("missing: accountIdOauth2", null,  '412');
    } else {
        authy.delete_user(params.accountIdOauth2, function(err, res) {
            if (err){
                console.log('Error in delete_user with serverAuthy: '+err);
                return callback(err, null,  '424');
            } else {
                callback(null);
            }
        });
    }


}
