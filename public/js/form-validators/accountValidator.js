
function AccountValidator(){

// build array maps of the form inputs & control groups //
    var messages = new Message();
    this.formFieldsGroups = [$('#name-fg'), $('#email-fg'), $('#username-fg'), $('#password-fg'), $('#new-password-fg')];
	this.formFields = [$('#name-tf'), $('#email-tf'), $('#user-tf'), $('#pass-tf'), $('#new-pass-tf')];
    this.formFieldsIcon = [$('#nameVerification'), $('#emailVerification'), $('#usernameVerification'), $('#passwordVerification'), $('#new-passwordVerification')];
    this.focusField = this.formFields[0];
	
// bind the form-error modal window to this controller to display any errors //
	
	this.validateName = function(name){
		return name.length >= 3 && name.length<255;
	}
	
	this.validatePassword = function(password){
		return password.length >= 6 && password.length<255;

	}
	
	this.validateEmail = function(email){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email) && email.length<255;
	}
	
	this.showErrors = function(arrayOrMessage, focusField){
        messages.showDanger(arrayOrMessage, function(){focusField.focus()});
	}

    this.verificationOk = function(field, fieldIcon){
        this.clearVerification(field, fieldIcon);
        fieldIcon.addClass('glyphicon-ok');
        field.addClass('has-success');
    }

    this.verificationNotOk = function(field, fieldIcon){
        this.clearVerification(field, fieldIcon);
        fieldIcon.addClass('glyphicon-ban-circle');
        field.addClass('has-error');
    }

    this.clearVerification = function(field, fieldIcon){
        fieldIcon.removeClass('glyphicon-ban-circle');
        fieldIcon.removeClass('glyphicon-ok');
        field.removeClass('has-error');
        field.removeClass('has-success');
    }

}

AccountValidator.prototype.validateName = function(name){
    return this.validateName(name);
}

AccountValidator.prototype.validateEmail = function(email){
    return this.validateEmail(email);
}

AccountValidator.prototype.validatePassword = function(password){
    return this.validatePassword(password);
}

AccountValidator.prototype.validateForm = function(){
	var e = [];
    this.focusField = null;

    this.cleanValidations();

	if (this.validateName(this.formFields[0].val()) == false) {
        this.verificationNotOk(this.formFieldsGroups[0], this.formFieldsIcon[0]);
        e.push(i18n.t('validation.account.wrongName'));
        this.focusField = this.formFields[0];
	} else {
        this.verificationOk(this.formFieldsGroups[0], this.formFieldsIcon[0]);
    }
	if (this.validateEmail(this.formFields[1].val()) == false) {
		this.verificationNotOk(this.formFieldsGroups[1], this.formFieldsIcon[1]);
        e.push(i18n.t('validation.account.wrongEmail'));
        if (this.focusField==null){
            this.focusField=this.formFields[1];
        }
	} else {
        this.verificationOk(this.formFieldsGroups[1], this.formFieldsIcon[1]);
    }
	if (this.validateName(this.formFields[2].val()) == false) {
		this.verificationNotOk(this.formFieldsGroups[2], this.formFieldsIcon[2]);
		e.push(i18n.t('validation.account.wrongUsername'));
        if (this.focusField==null){
            this.focusField=this.formFields[2];
        }
	} else {
        this.verificationOk(this.formFieldsGroups[2], this.formFieldsIcon[2]);
    }
	if (this.validatePassword(this.formFields[3].val()) == false) {
		this.verificationNotOk(this.formFieldsGroups[3], this.formFieldsIcon[3]);
		e.push(i18n.t('validation.account.wrongPassword'));
        if (this.focusField==null){
            this.focusField=this.formFields[3];
        }
	} else {
        this.verificationOk(this.formFieldsGroups[3], this.formFieldsIcon[3]);
    }
    //new password is optional
    if (this.formFields[4].val()){
	    if (this.validatePassword(this.formFields[4].val()) == false) {
		    this.verificationNotOk(this.formFieldsGroups[4], this.formFieldsIcon[4]);
		    e.push(i18n.t('validation.account.wrongNewPassword'));
            if (this.focusField==null){
                this.focusField=this.formFields[4];
            }
	    } else {
            this.verificationOk(this.formFieldsGroups[4], this.formFieldsIcon[4]);
        }
    }
	if (e.length) this.showErrors(e,this.focusField);
	return e.length === 0;
}

AccountValidator.prototype.cleanValidations = function(){
    
    for (var i=0, total = this.formFields.length; i<total; i++){
        this.clearVerification(this.formFieldsGroups[i], this.formFieldsIcon[i]);
    }   
}

AccountValidator.prototype.verificationOk = function(field, fieldIcon){
        verificationOk(field,fieldIcon);
}

AccountValidator.prototype.verificationNotOk = function(field, fieldIcon){
        verificationNotOk(field,fieldIcon);
}

	
