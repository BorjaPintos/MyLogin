

var typeOauth2Impl = {
        'LATCH_ID' : { 
                'check' : './latch/checkLatch',
                'pair' : './latch/pairLatch',
                'unpair' : './latch/unpairLatch'
                },
        'AUTHY_ID' : { 
                'check' : './authy/checkAuthy',
                'pair' : './authy/pairAuthy',
                'unpair' : './authy/unpairAuthy'
                }
};

var FunctionsOauth2 = exports.FunctionsOauth2 = function FunctionsOauth2(){


};


/*params = object like this:
*{ accountIdOauth2,
*  typeOauth2,
*  checkCode
*}
*callback(err, true|false)
*/

FunctionsOauth2.check = function (params, callback)
{
	'use strict';

	try {
        
		var oauth2CheckImpl = require(typeOauth2Impl[params.typeOauth2]['check']).Oauth2CheckImpl;
        if (!oauth2CheckImpl){
            callback(new Error('Unknown type oauth2"'+params.typeOauth2+'"'));
        }
        var paramsToCheckOauth2 = {
            accountIdOauth2 : params.accountIdOauth2,
            checkCode : params.checkCode
        }
	 	oauth2CheckImpl(paramsToCheckOauth2, callback);
	} catch (e) {
	 	console.error(params.typeOauth2  + e);
	 	throw new Error('Could not instantiate ' + params.typeOauth2 +' backend');
	}
};


/*params = object like this:
*{ 
* typeOauth2,
* pairToken,
*}
*callback(err, true|false)
*/

FunctionsOauth2.pair = function (params, callback)
{
	'use strict';

	try {
		var oauth2PairImpl = require(typeOauth2Impl[params.typeOauth2]['pair']).Oauth2PairImpl;
        if (!oauth2PairImpl){
            callback(new Error('Unknown type oauth2"'+params.typeOauth2+'"'));
        }
        var paramsToPairOauth2 = {
            user: params.user,
            pairToken : params.pairToken
        }
	 	oauth2PairImpl(paramsToPairOauth2, callback);
	} catch (e) {
	 	console.error(params.typeOauth2  + e);
	 	throw new Error('Could not instantiate ' + params.typeOauth2 +' backend');
	}
};


/*params = object like this:
*{ accountIdOauth2,
*  typeOauth2
*}
*callback(err, true|false)
*/

FunctionsOauth2.unpair = function (params, callback)
{
	'use strict';

	try {
		var oauth2UnpairImpl = require(typeOauth2Impl[params.typeOauth2]['unpair']).Oauth2UnpairImpl;
        if (!oauth2UnpairImpl){
            callback(new Error('Unknown type oauth2"'+params.typeOauth2+'"'));
        }
        var paramsToUnpairOauth2 = {
            accountIdOauth2 : params.accountIdOauth2
        }
	 	oauth2UnpairImpl(paramsToUnpairOauth2, callback);
	} catch (e) {
	 	console.error(params.typeOauth2  + e);
	 	throw new Error('Could not instantiate ' + params.typeOauth2 +' backend');
	}
};
