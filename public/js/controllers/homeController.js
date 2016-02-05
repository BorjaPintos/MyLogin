
function HomeController()
{

    var av = new AccountValidator(),
        oauth2 = new Oauth2Controller(),
        messages = new Message(),
        checkCodeOauth2 = new CheckCodeOauth2Controller(),
	    that = this;

// handle account deletion //
	$('#account-form-btn1').click(function(){ //delete, ajax
        if (av.validateName($('#user-tf').val()) && av.validatePassword($('#pass-tf').val())){
            checkCodeOauth2.checkCodeIfNeed($('#user-tf').val(),function(code){
                $('#checkCode-tf').val(code);
                that.deleteAccount();
            });
        } else {
            av.verificationNotOk($('#password-fg'), $('#passwordVerification'));
            messages.showDanger(i18n.t('valiation.account.wrongPassword'), function(){$('#pass-tf').focus()});
        }
    });

	$('#account-form-btn2').click(function(){ //Update submit
        if (av.validateForm()){
            checkCodeOauth2.checkCodeIfNeed($('#user-tf').val(),function(code){
                $('#checkCode-tf').val(code);
                $('#account-form').submit();
            });
        }
    });

	this.deleteAccount = function()
	{
		var that = this;
		$.ajax({
			url: '/deleteUser',
			type: 'POST',
			data: { username: $('#user-tf').val(),
                    password: $('#pass-tf').val(),
                    checkCode: $('#checkCode-tf').val()
                    },
			success: function(responseText, status, xhr, $form){
                messages.showSuccess(i18n.t('success.code.'+responseText+'.deleteUser') + ' ' + i18n.t("comun.redirecting"));
                setTimeout(function(){window.location.href = '/';}, 2000);
			},
			error: function(e){
                if (e.responseText == '410'){
                    messages.showDanger(i18n.t('error.code.'+e.responseText+'.deleteUser') + ' ' + i18n.t("comun.redirecting"));
                    setTimeout(function(){window.location.href = '/';}, 2000);
                } else {
                    av.verificationNotOk($('#password-fg'), $('#passwordVerification'));
				    messages.showDanger(i18n.t('error.code.'+e.responseText+'.deleteUser'), function(){$('#pass-tf').focus()});
                }
			}
		});
	}

}
