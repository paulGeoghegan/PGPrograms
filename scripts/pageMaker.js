
$("#topOfPage").append(`
		<a id="skipToContent" href="#main"> Skip to content </a>
		<a href="createAccount.html"> Create Account</a>
		<a href="login.html"> Login</a>

		<h1> Welcome to the `+$("title").text()+`</h1>

		<nav>
			<a href="index.html"> Home</a>
			<a href="timetable.html"> Timetable</a>
			<a href="classes.html"> Classes</a>
			<a href="news.html"> News</a>
			<a href="about.html"> About</a>
		</nav>
		</br>
`);

$("#bottomOfPage").append(`
	</br>
	<h2> Contact Us </h2>

	<a href="https://www.facebook.com"> <img src="../resources/fblogo.png" alt="Facebook logo" height="10%" width="10%"> </a>
	<a href="https://www.twitter.com"> <img src="../resources/twlogo.png" alt="Twitter logo" height="10%" width="10%"> </a>
	<a href="https://www.instagram.com"> <img src="../resources/inlogo.jpg" alt="Instagram logo" height="10%" width="10%"> </a>
	<a href="mailto:c19753889@mytudublin.ie"> <img src="../resources/ml.png" alt="Mail logo" height="10%" width="10%"> </a>

`);
