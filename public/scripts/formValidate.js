$('#loginform').validate({
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

	const post = $.post('http://localhost:3000/login', data);
	post.done(processResults);
	post.fail(processErrors);
}

$('#login').click(function() {
	$('#loginform').submit();
});

function processErrors() {
	console.log('Validation errors');
}

function processResults(rows, status, xhr) {
	console.log('Data sent to the server');
}
