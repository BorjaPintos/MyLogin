
function Oauth2Validator(){

    // build array maps of the form inputs & control groups //
    var messages = new Message();
	this.formFields = [$('#user-tf'), $('#selectpicker-oauth2'), $('#oauth2-pairNumber-input'), $('#oauth2-userpassword-input')];
    this.formFieldsGroups = [$('#user-fg'), $('#select-fg'), $('#oauth2-pairNumber-fg'), $('#oauth2-userpassword-fg')];
    this.focusField = this.formFields[0];
	
    // bind the form-error modal window to this controller to display any errors //
	
	this.validatePairNumber = function(pairNumber){
		return pairNumber.length > 0 ;
	}

	this.validateName = function(name){
		return name.length > 3 && name.length<255;
	}
	
	this.validatePassword = function(password){
		return password.length >= 6 && password.length<255;
	}

	this.validateOauth2Type = function(oauth2Type){
		return oauth2Type.length > 0;
	}

    this.verificationOk = function(field){
        this.clearVerification(field);
        field.addClass('has-success');
    }

    this.verificationNotOk = function(field){
        this.clearVerification(field);
        field.addClass('has-error');
    }

    this.clearVerification = function(field){
        field.removeClass('has-error');
        field.removeClass('has-success');
    }

	this.showErrors = function(arrayOrMessage, focusField){
        messages.showDanger(arrayOrMessage, function(){focusField.focus()});
	}

}

Oauth2Validator.prototype.validatePairNumber = function(pairNumber){
    return this.validatePairNumber(pairNumber);
}

Oauth2Validator.prototype.validateName = function(name){
    return this.validateName(name);
}

Oauth2Validator.prototype.validateOauth2Type = function(oauth2Type){
    return this.validateOauth2Type(oauth2Type);
}

Oauth2Validator.prototype.validatePassword = function(password){
    return this.validatePassword(password);
}

Oauth2Validator.prototype.validateFormPair = function(){
	var e = [];
    this.focusField = null;

	if (this.validateName(this.formFields[0].val()) == false) {
        this.verificationNotOk(this.formFieldsGroups[0]);
        e.push(i18n.t('validation.oauth2.wrongUsername'));
        this.focusField = this.formFields[0];
	} else {
        this.verificationOk(this.formFieldsGroups[0]);
    }
	if (this.validateOauth2Type(this.formFields[1].val()) == false) {
		this.verificationNotOk(this.formFieldsGroups[1]);
        e.push(i18n.t('validation.oauth2.wrongTypeOauth2'));
        if (this.focusField==null){
            this.focusField=this.formFields[1];
        }
	} else {
        this.verificationOk(this.formFieldsGroups[1]);
    }
	if (this.validatePairNumber(this.formFields[2].val()) == false) {
		this.verificationNotOk(this.formFieldsGroups[2]);
		e.push(i18n.t('validation.oauth2.wrongPairNumber'));
        if (this.focusField==null){
            this.focusField=this.formFields[2];
        }
	} else {
        this.verificationOk(this.formFieldsGroups[2]);
    }
	if (this.validatePassword(this.formFields[3].val()) == false) {
		this.verificationNotOk(this.formFieldsGroups[3]);
		e.push(i18n.t('validation.oauth2.wrongPassword'));
        if (this.focusField==null){
            this.focusField=this.formFields[3];
        }
	} else {
        this.verificationOk(this.formFieldsGroups[3]);
    }
	if (e.length) this.showErrors(e,this.focusField);
	return e.length === 0;

}

Oauth2Validator.prototype.validateFormUnPair = function(){
	var e = [];
    this.focusField = null;


	if (this.validateName(this.formFields[0].val()) == false) {
        this.verificationNotOk(this.formFieldsGroups[0]);
        e.push(i18n.t('validation.oauth2.wrongUsername'));
        this.focusField = this.formFields[0];
	} else {
        this.verificationOk(this.formFieldsGroups[0]);
    }
	if (this.validatePassword(this.formFields[3].val()) == false) {
		this.verificationNotOk(this.formFieldsGroups[3]);
		e.push(i18n.t('validation.oauth2.wrongPassword'));
        if (this.focusField==null){
            this.focusField=this.formFields[3];
        }
	} else {
        this.verificationOk(this.formFieldsGroups[3]);
    }
	if (e.length) this.showErrors(e,this.focusField);
	return e.length === 0;
}

Oauth2Validator.prototype.cleanValidations = function(){
    
    for (var i=0, total = this.formFields.length; i<total; i++){
        this.clearVerification(this.formFieldsGroups[i]);
    }   
}

Oauth2Validator.prototype.verificationOk = function(field){
        verificationOk(field);
}

Oauth2Validator.prototype.verificationNotOk = function(field){
        verificationNotOk(field);
}

	
