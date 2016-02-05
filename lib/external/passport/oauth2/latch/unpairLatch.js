var latch = require('latch-sdk');


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
        return callback("missing: accountIdOauth2",null, '412');
    } else {
        latch.unpair(params.accountIdOauth2, function(err, data) {
            if (err){
                console.log('Error in unpairLatch with serverLatch: '+err);
                return callback(err, null, '424');
            } else {
                callback(null);
            }
        });
    }
}
