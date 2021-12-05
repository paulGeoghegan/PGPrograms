

$('#loginForm').validate({
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
			required: 'Please enter your email',
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

	const post = $.post('/login', data);
	post.done(processResults);
	post.fail(processErrors);
}

$('#submitBtn').click(function() {
	$('#loginForm').submit();
});

function processErrors(message, status, xhr) {
	console.log('Errors:');
	console.log(message);
	console.log(status);
	console.log(xhr);

	$(`<p>${message}</p>`).appendTo("#loginForm");
}

function processResults(message, status, xhr) {
	console.log('Data sent to the server');
}
