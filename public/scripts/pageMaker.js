
$("#topOfPage").append(`
		<a id="skipToContent" href="#main"> Skip to content </a>
		<div id="loginLinks">
			<a href="http://localhost:3000/createAccount"> Create Account</a>
			<a href="http://localhost:3000/login"> Login</a>
		</div>

		<h1> Welcome to the `+$("title").text()+`</h1>

		<nav>
			<a href="http://localhost:3000/"> Home</a>
			<a href="http://localhost:3000/timetable"> Timetable</a>
			<a href="http://localhost:3000/classes"> Classes</a>
			<a href="http://localhost:3000/news"> News</a>
			<a href="http://localhost:3000/about"> About</a>
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
