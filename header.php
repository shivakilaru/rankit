<?php
require_once "db.php";
session_start();

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html> 

	<head> 

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<title>RankIt</title> 

		<link rel="shortcut icon" type="image/png" href="img/icon.png" />

		<link rel="stylesheet" type="text/css" href="css/reset.css" />
		<link rel="stylesheet" type="text/css" href="css/text.css" />
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>

		<script src="js/jqBarGraph.1.1.min.js"></script>
		<script src="js/masonry.pkgd.js"></script>
		<script src="js/rankit.js"></script>


		<!-- start Mixpanel --><script type="text/javascript">(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
mixpanel.init("efd452cb49007a30ec021658dff9f4ca");</script><!-- end Mixpanel -->
		<!-- Google Analytics -->
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-50282526-1', 'shivakilaru.com');
		  ga('send', 'pageview');

		</script>

	</head>

		<div class="main-container">
		
		<div class="top-bar">

			<div class="logo">
				<a href="index.php"><h1>Rankit</h1></a>
			</div>

			<ul class="navigation">
				<!-- <a style="float:left;" onClick="fakeLogin();"><li>FakeLogin</li></a>
				<a style="float:left;" onClick="fakeLogout();"><li>FakeLogout</li></a> -->
				<a id="login" style="float:left;"><li>Login</li></a>
				<!-- <a style="float:right;" id="logout" href="https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://shivakilaru.com/rankit/"><li>Log Out</li></a> -->
				<a style="float:left;"><li id="loggedInMessage" style="display:none;"></li></a>
				<a href="about" style="float:left;"><li>About</li></a>
				<a href="browse.php" style="float:left;"><li>Browse</li></a>
				<a href="myrankits.php" style="float:left;"><li>My Rankits</li></a>
				<a href="index.php" style="float:left;"><li>New Rankit</li></a>

			</ul>

		</div>

		<hr/>

<?php

if (isset($_SESSION['loggedIn'])) {
	echo('<script type="text/javascript">
			var firstName = "'.$_SESSION['first_name'].'";
			setLoggedIn(firstName);
		</script>');
}
else {

}