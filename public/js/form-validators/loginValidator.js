
function LoginValidator(){
    var message = new Message();
	this.formFields = [$('#user-tf'), $('#pass-tf')];
    this.focusField = this.formFields[0];
    
	this.showErrors = function(a, focusField){
        message.showDanger(a, function(){focusField.focus()});
	}

}




LoginValidator.prototype.validateForm = function()
{
    var e = [];
    this.focusField = null;

	for (var i=0; i < this.formFields.length; i++){
        this.formFields[i].removeClass('error');
    }

    //If two of them have error, we focus on username
	if (this.formFields[0].val() == '') {
		this.formFields[0].addClass('error');
        e.push(i18n.t('validation.login.wrongUsername'));
        this.focusField=this.formFields[0];
	}
	if (this.formFields[1].val() == '') {
		this.formFields[1].addClass('error');
        e.push(i18n.t('validation.login.wrongPassword'));
        if (this.focusField==null){
            this.focusField=this.formFields[1];
        }
	}



	if (e.length) this.showErrors(e,this.focusField);
	return e.length === 0;

}
