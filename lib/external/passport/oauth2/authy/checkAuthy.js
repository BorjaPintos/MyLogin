var authy = require('./authy').getInstance();



/**ERROR CODES
412 missing parameters
424 server Oauth2 not avaliable
*/

/*params = object like this:
*{ 
*  accountIdOauth2,
*  checkCode
*}
*callback(err, true|false)
*/
exports.Oauth2CheckImpl = function Oauth2CheckImpl(params, callback){
    if (!params.accountIdOauth2){
        return callback("missing: accountIdOauth2", null,  '412');
    } else if (!params.checkCode) {
        return callback("missing: checkCode", null,  '412');
    } else {
        authy.verify(params.accountIdOauth2, params.checkCode, function(err, res) {
            if (err){
                if (!err.success){ 
                    callback(null,false);
                } else {
                    console.log("checkAuthy, error authy.verify " + err);
                    callback(err,false, '424'); //server not avaliable
                }
            } else if (res && res.success) {
                callback(null,true);
            } else {
                console.log("checkAuthy, error authy.verify " + err);
                callback(err, false, '424'); //server not avaliable
            }
         });
    }
}
