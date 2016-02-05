
function SignupController()
{
    var av = new AccountValidator();

    // redirect to login when cancel button is clicked //
	$('#account-form-btn1').click(function(){ window.location.href = '/login';});

	$('#account-form-btn2').click(function(){ //Update submit
        if (av.validateForm()){
            $('#account-form').submit();
        }
    });

}
