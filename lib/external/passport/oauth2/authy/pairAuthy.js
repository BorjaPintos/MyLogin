var authy = require('./authy').getInstance();



/**ERROR CODES
412 missing parameters
402 pairToken not found
424 server Oauth2 not avaliable
*/
/*params = object like this:
*{ 
*  user
*  pairToken //telf in this case
*}
*callback(err, accountIdOauth2)
*/
exports.Oauth2PairImpl = function Oauth2PairImpl(params, callback){
    if (!params.pairToken){
        return callback('missing phone number', null, '412');
    } if (!params.user || !params.user.email){
        return callback('user', null, '412');
    } else {
        
        authy.register_user(params.user.email, params.pairToken, '34', function (err, res) {
            if (err){
                if (err.cellphone === 'is invalid' 
                    || err.message === 'User was not valid.'){
                    return callback(err, null, '402');
                } else {
                    console.log('Error in register_user with serverAuthy: '+err);
                    return callback(err, null, '424');
                }
            } else if (res && res.user && res.user.id){
                callback(null, (res.user.id).toString(), null);
            } else {
                console.log('Error in authy do not receive any data');
                return callback('Error in authy do not receive any data', '424');
            }
        });
    }
}













