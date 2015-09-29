
function AccountController()
{

	var av = new AccountValidator();
	var that = this;

	$('#name-tf').change(function(){
        if (av.validateName($('#name-tf').val()) == false){
            that.verificationNotOk($('#name-fg'), $('#nameVerification'));
        } else {
            that.verificationOk($('#name-fg'), $('#nameVerification'));
            
        } 
    });

	$('#email-tf').change(function(){
        if (av.validateEmail($('#email-tf').val()) == false){
            that.verificationNotOk($('#email-fg'), $('#emailVerification'));
        } else {
            that.verifyEmail();
        } 
    });

    $('#user-tf').change(function(){
        if (av.validateName($('#user-tf').val()) == false){
            that.verificationNotOk($('#username-fg'), $('#usernameVerification'));
        } else {
            that.verifyUsername();
        } 
    });

    $('#pass-tf').change(function(){
        if (av.validatePassword($('#pass-tf').val()) == false){
            that.verificationNotOk($('#password-fg'), $('#passwordVerification'));
        } else {
            that.verificationOk($('#password-fg'), $('#passwordVerification'));
            
        } 
    });

	this.verifyEmail = function()
	{
		var that = this;
		$.ajax({
			url: '/emailVerification',
			type: 'POST',
			data: { email: $('#email-tf').val()
                  },
			success:function(responseText, status, xhr){
	            that.verificationOk($('#email-fg'), $('#emailVerification'));
			},
			error: function(e){
                that.verificationNotOk($('#email-fg'), $('#emailVerification'));
			}
		});
	}

	this.verifyUsername = function()
	{
		var that = this;
		$.ajax({
			url: '/usernameVerification',
			type: 'POST',
			data: { username: $('#user-tf').val()
                  },
			success:function(responseText, status, xhr){
	            that.verificationOk($('#username-fg'), $('#usernameVerification'));
			},
			error: function(e){
                that.verificationNotOk($('#username-fg'), $('#usernameVerification'));
			}
		});
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
