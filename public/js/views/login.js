
$(document).ready(function(){
	
	var lv = new LoginValidator(),
	    lc = new LoginController(),
        messages = new Message(),
        comunInit = new ComunInit(),
        checkCodeOauth2 = new CheckCodeOauth2Controller();
    

    comunInit.init(function (err, t){
        if (err){
            console.log(err);        
        } else {
            $('#user-tf').focus();
        }
    });

    $(document).keypress(function(e) {
        if(e.which == 13) {
            $('#btn-login').click();
        }
    });

    $('#btn-login').click(function(){
        if (lv.validateForm()){
            checkCodeOauth2.checkCodeIfNeed($('#user-tf').val(),function(code){
                $('#checkCode-tf').val(code);
                $('#login-form').submit();
            });
        }
    });

	$('#login-form').ajaxForm({
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
            if (e){
                $('#checkCode-tf').val("");
                messages.showDanger(i18n.t('error.code.'+e.responseText+'.login'), function(){$('#user-tf').focus()});
            }
		}
	}); 
	
})
