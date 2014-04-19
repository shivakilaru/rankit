<?php
require_once "db.php";
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

	</head>

		<div class="main-container">
		
		<div class="top-bar">

			<div class="logo">
				<a href="index.php"><h1>Rankit</h1></a>
			</div>

			<ul class="navigation">
				<a href="browse.php" style="float:left;"><li>Browse</li></a>
				<li>My Rankits</li>
				<li>New Rankit</li>
			</ul>

			<div class="login-container">
				<a id="login">Login</a>
			</div>

		</div>

		<hr/>
