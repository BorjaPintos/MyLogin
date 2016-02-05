function GenericModal(){
    var that = this;

    this.base = function(header, msg){
        $('#genericModal').modal({ show : false, keyboard : false, backdrop : true});
        $('#genericModalInput').val("");
        $('#genericModalHeader').text(header);
        that.cleanField($('#labels'));
        if (that.isArray(msg)){
            that.addArray($('#labels'), msg);
        } else if (that.isString(msg)){
            that.addString($('#labels'), msg);
        } else {
            that.addString($('#labels'), i18n.t('comun.unknown'));
        }

    }

    this.showInfo = function(header, msg, callbackClickButtonOk){
        this.base(header, msg);
        $('#genericModalButtonOk').click(function(){
            $('#genericModal').modal("hide");
            callbackClickButtonOk();
        });
        $('#genericModal').modal("show");
        
    }


    this.question = function(header, msg, callbackClickButtonOk){
        this.base(header, msg);
        $('#genericModalInput').show();
        $('#genericModalButtonOk').click(function(){
            $('#genericModal').modal("hide");
            callbackClickButtonOk($('#genericModalInput').val())
        });
        $('#genericModal').modal("show");

    }

    this.addArray = function(div, array){
        for (var i = 0, total = array.length; i <total ; i++) {
            var p = $('<p></p>');
            p.text(array[i]);
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
