
function Message(){

	this.warningMessage = $('#messageWarning');
	this.successMessage = $('#messageSuccess');
	this.infoMessage = $('#messageInfo');
	this.dangerMessage = $('#messageDanger');


	this.showWarning = function(m, callback){
        var that = this;
        this.hideAll(
            function(){
                that.cleanField(that.warningMessage);
                if (that.isArray(m)){
                    that.addArray(that.warningMessage, m);
                } else if (that.isString(m)){
                    that.addString(that.warningMessage, that.getString(m));
                } else {
                    that.addString(that.warningMessage, i18n.t('comun.unknown'));
                }
		        that.warningMessage.slideDown(typeof(callback) != 'undefined' ? callback : $.noop);
            }
        );
	};

	this.showSuccess = function(m, callback){
        var that = this;
        this.hideAll(
            function(){
                that.cleanField(that.successMessage);
                if (that.isArray(m)){
                    that.addArray(that.successMessage, m );
                } else if (that.isString(m)){
		            that.addString(that.successMessage, that.getString(m) );
                } else {
                    that.addString(that.successMessage, i18n.t('comun.unknown'));
                }
		        that.successMessage.slideDown(typeof(callback) != 'undefined' ? callback : $.noop);
            }
        );
	};

	this.showInfo = function(m, callback){
        var that = this;
        this.hideAll(
            function(){
                that.cleanField(that.infoMessage);
                if (that.isArray(m)){
                    that.addArray(that.infoMessage,  m );
                } else if (that.isString(m)){
                    that.addString(that.infoMessage, that.getString(m));
                } else {
                    that.addString(that.infoMessage, i18n.t('comun.unknown') );
                }   
		        that.InfoMessage.slideDown(typeof(callback) != 'undefined' ? callback : $.noop);
            }
        );
	};

	this.showDanger = function(m, callback){
        var that = this;
        this.hideAll(
            function(){
                that.cleanField(that.dangerMessage);
                if (that.isArray(m)){
                    that.addArray(that.dangerMessage, m );
                } else if (that.isString(m)){
                    that.addString(that.dangerMessage, that.getString(m) );
                } else {
                    that.addString(that.dangerMessage, i18n.t('comun.unknown'));
                }
		        that.dangerMessage.slideDown(typeof(callback) != 'undefined' ? callback : $.noop);
            }
        );        
	};

	this.hideWarning = function(callback){
		this.warningMessage.slideUp(typeof(callback) != 'undefined' ? callback : $.noop);
	};

	this.hideSuccess = function(callback){
		this.successMessage.slideUp(typeof(callback) != 'undefined' ? callback : $.noop);
	};

	this.hideInfo = function(callback){
		this.infoMessage.slideUp(typeof(callback) != 'undefined' ? callback : $.noop);
	};

	this.hideDanger = function(callback){
		this.dangerMessage.slideUp(typeof(callback) != 'undefined' ? callback : $.noop);
	};

    this.hideAll = function(callback){
        var that = this;
        this.hideWarning(function(){
            that.hideSuccess(function(){
                that.hideInfo(function(){
                    that.hideDanger(callback); 
                });
            });
        });        
    };

    this.getString = function(text){
        // replace all '['  ']'  '"'
        return text.replace(/[\[\]\"]/g,'');
    }

    this.addArray = function(div, array){
        for (var i = 0, total = array.length; i <total ; i++) {
            var p = $('<p></p>');
            p.text(this.getString(array[i]));
            div.append(p);
        }
    }

    this.addString = function(div, string){
        var p = $('<p></p>');
        p.text(string);
        div.append(p);
    }

    this.cleanField = function(div){
        div.children().each(function (i, child){
            child.remove();
        })
    }

    this.isArray = function (myArray) {
        return Object.prototype.toString.call(myArray) === '[object Array]';
    }

    this.isString = function(myString){
        return typeof(myString === 'string');
    }

}
