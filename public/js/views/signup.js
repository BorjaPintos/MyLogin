
$(document).ready(function(){
	
	var av = new AccountValidator(),
	    sc = new SignupController(),
        ac = new AccountController(),
        messages = new Message(),
        comunInit = new ComunInit(),
        that = this;
	
    comunInit.init(function(err, t){
        if (err){
            console.log(err);
        } else {
	        $('#name-tf').focus();
	        $('#account-form h1').text(t('signup.header.title'));
            $('#account-form-btn1').html(t('signup.button.cancel'));
	        $('#account-form-btn2').html(t('signup.button.signup'));
	        $('#account-form-btn2').addClass('btn-primary');
            $('#account-form').fadeIn($.noop);
        }
    });
    $('account-form').hide();


    $(document).keypress(function(e) {
        if(e.which == 13) {
            $('#account-form').submit();
        }
    });
   
    $('#account-form').ajaxForm({
	    success	: function(responseText, status, xhr, $form){
		    if (status == 'success') window.location.href = '/home';
	    },
	    error : function(e){
            if (e){
                that.parseErrors(e.responseText, 'error.code.','.signup');
            }
	    }
    });

    this.parseErrors = function(errorString, i18nInit, i18nEnd){
        var errorsArray = errorString.split(',');
        that.addValidations(errorsArray);
        messages.showDanger(that.translate(errorsArray, i18nInit, i18nEnd), function(){
            that.getFocusField(errorsArray).focus()
        });
    };

    /***
    RESUME ERROR CODES:

    601 - Enter a valid Name
    602 - Name.length > 3 and < 255
    603 - Enter a valid email
    604 - email.length < 255
    605 - Enter a valid UserName
    606 - Username.length > 3 and < 255
    607 - Enter a valid Password
    608 - Password.length > 6 and < 255

    ***/

    this.getFocusField = function(errors){
        //the first error will be focus
        var formFields = [$('#name-tf'), $('#email-tf'), $('#user-tf'), $('#pass-tf')];
        var index=2;//default user-tf
        if (errors.length){
            var code = errors[0];
            if (code == '601' || code == '602'){
                index=0;
            }
            else if (code == '603' || code == '604' ){
                index=1;
            }
            else if (code == '605' || code == '606'){
                index=2;
            }
            else if (code == '607' || code == '608'){
                index=3;
            }
        } 
        return formFields[index]; 
    }

    this.addValidations = function(errors){

        var formFieldsGroups = [$('#name-fg'), $('#email-fg'), $('#username-fg'), $('#password-fg')],
            formFieldsIcon = [$('#nameVerification'), $('#emailVerification'), $('#usernameVerification'), $('#passwordVerification')],
            errorIndex = [];
        //the first error will be focus
        if (errors.length){
            for (var i=0, total = errors.length;i<total;i++) {
                var code = errors[i];
                if (code == '601' || code == '602'){
                    errorIndex.push(0);
                } 
                else if (code == '603' || code == '604' ){
                    errorIndex.push(1);
                } 
                else if (code == '605' || code == '606' ){
                    errorIndex.push(2);
                } 
                else if (code == '607' || code == '608'){
                    errorIndex.push(3);
                } 
            }
            for (var i = 0, total = formFieldsGroups.length;i<total;i++){
                if ($.inArray(i, errorIndex) !== -1) {
                    av.verificationNotOk(formFieldsGroups[i],formFieldsIcon[i]);
                } else {
                    av.verificationOk(formFieldsGroups[i],formFieldsIcon[i]);
                }
            }

        } 
    }

    this.translate = function(errorsArray, i18nInit, i18nEnd){
        if (!i18nInit) i18nInit='';
        if (!i18nEnd) i18nEnd='';
        if (messages.isArray(errorsArray)){
            var arrayTranslated = [];
            for (var i=0, total = errorsArray.length;i<total;i++) {
                arrayTranslated.push(i18n.t(i18nInit+messages.getString(errorsArray[i])+i18nEnd));
            }
            return arrayTranslated;
        } else if (messages.isString(errorsArray)){
            return i18n.t(i18nInit+errorsArray+i18nEnd);        
        }
    }


})
