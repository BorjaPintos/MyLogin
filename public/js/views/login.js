
$(document).ready(function(){
	
	var lv = new LoginValidator();
	    lc = new LoginController(),
        messages = new Message(),
        comunInit = new ComunInit();
    

    comunInit.init(function (err, t){
        if (err){
            console.log(err);        
        } else {
            $('#user-tf').focus();
        }
    });

	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
            if (e){
                messages.showDanger(i18n.t('error.code.'+e.responseText+'.login'), function(){$('#user-tf').focus()});
            }
		}
	}); 

	

	
})
