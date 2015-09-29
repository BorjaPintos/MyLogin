var bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);
    

var createHash = exports.createHash = function(word) {
    if (word){
        return bcrypt.hashSync(word, salt);
     } else return '';
}

exports.compare = function(word, hashword){
    return (bcrypt.compareSync(word,hashword));
}

