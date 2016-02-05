var latch = require('latch-sdk');



/**ERROR CODES
412 missing parameters
402 token not found
424 server Oauth2 not avaliable
*/
/*params = object like this:
*{ 
*  user //do not user in this case
*  pairToken
*}
*callback(err, accountIdOauth2)
*/
exports.Oauth2PairImpl = function Oauth2PairImpl(params, callback){
    if (!params.pairToken){
        return callback('missing pairToken', null, '412');
    } else {
        latch.pair( params.pairToken, function(err, data) {
            if (err){
                console.log('PairLatch 23: Error in pairLatch with serverLatch: '+err);
                return callback(err, null, '424');
            } else if (data["error"]) {
                if (data["error"]["code"] === 206){//usually pairToken not found
                    callback(data["error"], null, '402');
                } else {
                    console.log('PairLatch 29: Error in pairLatch with serverLatch: '+data["error"]); 
                    callback(data["error"],null, '424');
                }
            } else if (!data["data"]){
                console.log('PairLatch 33: Error in pairLatch do not receive any data');
                return callback('Error in pairLatch do not receive any data', '424');
            }else if (data["data"]["accountId"]){
                callback(null, data["data"]["accountId"], null);
            } else {
                console.log('PairLatch 39: Error in pairLatch no data');
                return callback('Error in pairLatch do not receive any data', null, '424');         
            }
        });
    }
}













