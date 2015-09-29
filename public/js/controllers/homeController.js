
function HomeController()
{

    var av = new AccountValidator(),
        messages = new Message(),
	    that = this;

// handle account deletion //
	$('#account-form-btn1').click(function(){
        if (av.validatePassword($('#pass-tf').val())){
            that.deleteAccount();
        } else {
            av.verificationNotOk($('#password-fg'), $('#passwordVerification'));
            messages.showDanger(i18n.t('valiation.account.wrongPassword'), function(){$('#pass-tf').focus()});
        }
    });

	this.deleteAccount = function()
	{
		var that = this;
		$.ajax({
			url: '/deleteUser',
			type: 'POST',
			data: { username: $('#user-tf').val(),
                    password: $('#pass-tf').val()
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
