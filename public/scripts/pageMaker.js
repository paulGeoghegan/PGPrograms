
$("#topOfPage").append(`
		<a id="skipToContent" href="#main"> Skip to content </a>
		<div id="loginLinks">
		</div>

		<h1> Welcome to the `+$("title").text()+`</h1>

		<nav>
			<a href="/"> Home</a>
			<a href="/timetable"> Timetable</a>
			<a href="/classes"> Classes</a>
			<a href="/news"> News</a>
			<a href="/about"> About</a>
		</nav>
		</br>
`);

$("#bottomOfPage").append(`
	</br>
	<h2> Contact Us </h2>

	<a href="https://www.facebook.com"> <img src="resources/fblogo.png" alt="Facebook logo" height="3%" width="3%"> </a>
	<a href="https://www.twitter.com"> <img src="resources/twlogo.png" alt="Twitter logo" height="3%" width="3%"> </a>
	<a href="https://www.instagram.com"> <img src="resources/inlogo.png" alt="Instagram logo" height="3%" width="3%"> </a>
	<a href="mailto:c19753889@mytudublin.ie"> <img src="resources/ml.png" alt="Mail logo" height="3%" width="3%"> </a>

`);


//Checks if the user is logged in or not
if($.get('/loggedin'))
{
	$("#loginLinks").append(`<a href="/account>Account</a>`);
} //End if
else
{
	$("#loginLinks").append(`<a href="/createAccount">Create Account</a>`);
}