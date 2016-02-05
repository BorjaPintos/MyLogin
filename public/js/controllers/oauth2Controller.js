function Oauth2Controller(){
    var that = this,
        messages = new Message(),
        ov = new Oauth2Validator(),
        checkCodeOauth2 = new CheckCodeOauth2Controller();


    this.selectLabelOauth2 = function(){
        $('#aditional-note').text('');
        if ($('#selectpicker-oauth2').val() === 'AUTHY_ID'){
            $('#oauth2-label-tf').text(i18n.t('oauth2Options.code.AUTHY_ID'));
            $('#aditional-note').text('*'+i18n.t('oauth2Options.noSavePhone'));
        } else if ($('#selectpicker-oauth2').val() === 'LATCH_ID'){
            $('#oauth2-label-tf').text(i18n.t('oauth2Options.code.LATCH_ID'));
        }
    };

    $('#selectpicker-oauth2').change(function(){
        that.selectLabelOauth2();
    });

    $('#oauth2-form-pair').click(function(){
        if (ov.validateFormPair()){
            if ($('#selectpicker-oauth2').val() === 'AUTHY_ID'){
                $('#oauth2-form-container').modal('hide');
                that.confirmAuthy(that.pair);
            } else {
                that.pair();
            }
        }
    });

    $('#oauth2-form-unpair').click(function(){
        if (ov.validateFormUnPair()){
            $('#oauth2-form-container').modal('hide');
            checkCodeOauth2.checkCodeIfNeed($('#user-tf').val(),function(code){
                $('#checkCode-tf').val(code);
                that.unPair();
            });
        }
    });

    $('#oauth2-close').click(function(){
        $('#oauth2-form-container').modal('hide');
        that.clean();
     });


    this.confirmAuthy = function(callback){
        var genericModal = new GenericModal();
        genericModal.showInfo(
            i18n.t('oauth2Options.confirm'), 
            that.generateInfoAuthy(new Array()), 
            callback);
    };

    this.generateInfoAuthy = function(array){
        array[0] = (i18n.t('oauth2Options.email')+ $('#email-tf').val());
        array[1] = (i18n.t('oauth2Options.phone')+ $('#oauth2-pairNumber-input').val());
        array[2] = (i18n.t('oauth2Options.noSavePhone'));
        return array;
    };

	this.pair = function(){
		$.ajax({
			url: '/oauth2/pair',
			type: 'POST',
			data: { pairToken: $('#oauth2-pairNumber-input').val(), 
                    username: $('#user-tf').val(),
                    password: $('#oauth2-userpassword-input').val(),
                    typeOauth2: $('#selectpicker-oauth2').val()},
			success: function(responseText, status, xhr, $form){
                messages.showSuccess(i18n.t('success.code.'+responseText+'.oauth2Pair'), function(){
                    setTimeout(function(){window.location.href = '/home';});
                });
			},
			error: function(e){
                if (e.responseText == '410'){
                    messages.showDanger(i18n.t('error.code.'+e.responseText+'.oauth2Pair') + ' ' + i18n.t("comun.redirecting"));
                    setTimeout(function(){window.location.href = '/';}, 2000);
                } else {
				    messages.showDanger(i18n.t('error.code.'+e.responseText+'.oauth2Pair'), function(){
                        $('#oauth2-pairNumber-input').focus()
                        that.clean();
                    });
                }
			}
		});
	}


	this.unPair = function(){
		$.ajax({
			url: '/oauth2/unPair',
			type: 'POST',
            data: {username: $('#user-tf').val(),
                   password: $('#oauth2-userpassword-input').val(),
                   checkCode: $("#checkCode-tf").val()},
			success: function(responseText, status, xhr, $form){
                messages.showSuccess(i18n.t('success.code.'+responseText+'.oauth2UnPair'), function(){
                    setTimeout(function(){window.location.href = '/home';});
                });
			},
			error: function(e){
                if (e.responseText == '410'){
                    messages.showDanger(i18n.t('error.code.'+e.responseText+'.oauth2UnPair') + ' ' + i18n.t("comun.redirecting"));
                    setTimeout(function(){window.location.href = '/';}, 2000);
                } else {
                    messages.showDanger(i18n.t('error.code.'+e.responseText+'.oauth2UnPair'), function(){
                        $('#oauth2-pairNumber-input').focus()
                        that.clean();
                    });
                }
			}
		});
	}

    this.clean = function(){
        $("#oauth2-pairNumber-input").val("");
        $("#oauth2-userpassword-input").val("");
    }

}

