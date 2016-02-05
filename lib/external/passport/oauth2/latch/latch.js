var latch = require('latch-sdk'),
    config = require('./latch-config');

module.exports = function(){
    latch.init({appId: config.appId, secretKey: config.secretKey});
    console.log('init latch');
}
