var authy = require('authy'),
    config = require('./authy-config'),
    instance = undefined;

exports.getInstance = function getInstance(){
    if (!instance){
        if (config.url){ //sandbox for example
            instance = authy(config.appId, config.url);
        } else {
            instance = authy(config.appId);
        }
        console.log('init authy');
    } 
    return instance;    

}
