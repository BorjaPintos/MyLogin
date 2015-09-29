function ComunInit(){

    var comunController = new ComunController();
    var suportedLang = ['es', 'en'];
    this.init = function (callback){
        i18n.init({
            resGetPath: 'locales/__lng__.json',
            cookieName: 'locale'
        },
        function(err, t) {
            console.log(i18n.lng());
            var language = getCompatible(i18n.lng())

            i18n.setLng(language, function(err, t){
                    comunController.init();
                    if (callback) callback(err, t);
             });

        });
    }
    var getCompatible = function(lang){
        for (var i = 0, languages = suportedLang.length; i<languages; i++){
            if (lang.search(suportedLang[i])>=0){
                return suportedLang[i];
            }
        }
        return languages[0];//default
    }
}
