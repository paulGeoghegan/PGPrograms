
$('#createAccountForm').validate({
	rules:{
		email:{
			required: true,
			minlength: 5,
			email: true
		},
		password:{
		},
			required: true,
			minlength: 8
	},

	//Messages to be sent if rules arent met
	messages:{
		email:{
			required: 'Please enter your email',
			minlength: 'Your email must be atleast 5 characters',
			email: 'This is not a valid email'
		},
		password:{
			required: 'Please enter your password',
			minlength: 'Your password must be atleast 8 characters'
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
		email: $('#email')[0].value,
		password: $('#password')[0].value
	}

	//Tries to create a user
	try
	{

		const post = $.post('http://localhost:3000/adduser', data);
		post.done(processResults);

		//Tries to log user in
		try
		{
			const post2 = $.post('http://localhost:3000/login', data);
			post2.done(processResults);
		} //End inner try
		catch{
			post2.fail(processErrors);
		} //End catch

	} //End outer try
	catch{
		post.fail(processErrors);
	} //End catch

} //End createAjaxPost

$('#submitBtn').click(function() {
	$('#createAccountForm').submit();
});

function processErrors(message, status, xhr) {
	console.log('Validation errors');
	console.log(message, "\n", status, "\n", xhr);
	$(`<p>${message.responseJSON.message}</p>`).appendTo("#createAccountForm");

}

function processResults(message, status, xhr, data) {
	console.log('User created');
}
