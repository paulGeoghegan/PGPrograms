
$('#changePasswordForm').validate({
	rules:{
		password:{
			required: true,
			minlength: 8
		},
		passwordConfirm:{
		},
			required: true,
			minlength: 8,
			equalTo : "#password"
	},

	//Messages to be sent if rules arent met
	messages:{
		password:{
			required: 'Please enter a new password',
			minlength: 'Your password must be atleast 8 characters'
		},
		passwordConfirm:{
			required: 'Please enter your password again',
			equalTo:'Passwords tdo not match'
		}
	},


	onfocusout: validateFields,
	submitHandler: createAjaxPost

});

function validateFields(element, event) {
	$(element).valid();
}

function createAjaxPost() {
	const data = {
		password: $('#password')[0].value
	}

	const post = $.post('/changePassword', data);
	post.done(processResults);
	post.fail(processErrors);

} //End createAjaxPost

$('#submitBtn').click(function() {
	$('#changePasswordForm').submit();
});

function processErrors(message, status, xhr) {
	console.log('Validation errors');
	console.log(message, "\n", status, "\n", xhr);
	$(`<p>${message.responseJSON.message}</p>`).appendTo("#createAccountForm");

}

function processResults(message, status, xhr, data) {
	console.log('Password updated');
}
