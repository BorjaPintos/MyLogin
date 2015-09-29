var i18n = require('i18n'),
    catalog = i18n.getCatalog(),
    languages = [];

for (var lang in catalog){
    languages.push(lang);
}

exports.getLanguagesAvaliables = function(){
    return languages;  
}
