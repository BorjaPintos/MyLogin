
function CheckCodeOauth2Controller(){
}

CheckCodeOauth2Controller.prototype.getTypeOauth2 = function(username, callback){
	$.ajax({
		url: '/userTypeOauth2',
		type: 'POST',
		data: { username: username},
		success: function(responseText, status, xhr, $form){
            callback(responseText);
		},
		error: function(e){
            //user do not have a typeOauth2
            callback();
		}
	});
}

CheckCodeOauth2Controller.prototype.checkCodeIfNeed = function(username, callback){
    var that = this;
    var typeOauth2 = this.getTypeOauth2(username, function(typeOauth2){
        if (typeOauth2 && typeOauth2 !== 'LATCH_ID'){ //latch do not use checkCode
            var genericModal = new GenericModal();
            genericModal.question(i18n.t('checkCodeOaut2.header'), i18n.t('checkCodeOaut2.label'), function(answer){
                callback(answer);
            });
        } else {
            callback("");
        }
    });
}


