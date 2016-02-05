var latch = require('latch-sdk'),
    config = require('./latch-config');



/**ERROR CODES
412 missing parameters
424 server Oauth2 not avaliable
*/

/*params = object like this:
*{ 
*  accountIdOauth2,
*  checkCode (not necesary, latch do not use checkCode)
*}
*callback(err, true|false)
*/
exports.Oauth2CheckImpl = function Oauth2CheckImpl(params, callback){
    if (!params.accountIdOauth2){
        return callback("missing: accountIdOauth2", null, '412');
    } else {
        latch.status(params.accountIdOauth2, function(err, data) {
            if (err){
                console.log("checkLatch, error latch.status " + err);
                callback(err,false, '424'); //server not avaliable
            } else if (!data || !data['data'] || !data['data']['operations'] || !data['data']['operations'][config.appId]){
                callback('Error in pairLatch do not receive any data', false, '424');
            } else if (data['data']['operations'][config.appId]['status'] == 'on') {
                callback(null,true);
            } else {
                callback(null,false);
            }
         });
    }
}
