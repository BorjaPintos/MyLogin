
function ComunController(){

    this.init = function () {
        var messages = new Message(),
            that = this;

        //NAVBAR
	    $('#btn-logout').click(function(){that.attemptLogout();});

	    this.attemptLogout = function()
	    {
		    var that = this;
		    $.ajax({
			    url: "/logout",
			    type: "POST",
			    data: {logout : true},
			    success: function(responseText, status, xhr, $form){
	     			if (status == 'success') {
                        messages.showSuccess(i18n.t('success.code.'+responseText+'.logout') + ' ' + i18n.t("comun.redirecting"));
                        setTimeout(function(){window.location.href = '/login';}, 2000);
                    }
			    },
			    error: function(e){
				    messages.showDanger(i18n.t('error.code.'+e.responseText+'.logout') + ' ' + i18n.t("comun.redirecting"));
                    setTimeout(function(){window.location.href = '/login';}, 2000);
			    }
		    });
	    }


        //FOOTER
        $('#selectpicker-footer').selectpicker('val', i18n.lng());
        $('#selectpicker-footer').change(function(){
            i18n.setLng($('#selectpicker-footer').val(), function(err, t) { location.reload();});
        });
    }
}
