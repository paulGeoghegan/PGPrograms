
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

