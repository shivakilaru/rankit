<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html> 

<?php
	if (isset($_POST['cat'])){
		echo $_POST['cat'];
	}
?>


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
		<script src="js/backend.js"></script>


	</head>
	
	<body>

		<script type="text/javascript">
			$(document).ready(function(){
				$('#add-ui').hide();
				$('#results-ui').show();
				console.log("RICK");
			});
		</script>
	
		<div class="main-container">
			
			<div class="top-bar">

				<div class="logo">
					<a href="index.php"><h1>Rankit</h1></a>
				</div>

				<ul class="navigation">
					<li>Browse</li>
					<li>My Rankits</li>
					<li>New Rankit</li>
				</ul>

				<div class="login-container">
					<a id="login">Login</a>
				</div>

			</div>

			<hr/>



			<div class="content-container">
			
				<!-- Screen 1: "Add UI" -Adding Options and Factors -->
				<div id="add-ui">

					<div class="explanation">
						Rankit helps you make a decision. On the left, enter the options you’re trying to decide between, and on the right, enter the factors you’re judging them by. Weight the factors if necessary. Then press “Rank!”
					</div>

					<div class="get-title">
						<h2>Title</h2>
					<input type="text" id="title-box" name="title" value=
						"Pokemon"/>

					</div>

					<div class="add-options">

						<h2>Options</h2>

						<input type="text" id="option-box" name="option"/>
						<a id="submit-option"></a>

						<h4 class="list-header">Current List</h4>
						<ul id="option-list">
							<li id="option-item">Charmander<a class="delete-option"></a></li>
							<li id="option-item">Bulbasaur<a class="delete-option"></a></li>
							<li id="option-item">Squirtle<a class="delete-option"></a></li>
						</ul>


					</div>

					<div class="add-factors">

						<h2>Factors</h2>

						<input type="text" id="factor-box" name="factor"/>
						<a id="submit-factor"></a>

						<h4 class="list-header">Current List</h4>
						<ul id="factor-list">
							<li id="factor-item">Speed<a class="delete-factor"></a><input type="range" min="0" max="50" step="1" value="25" class="factor-slider"></li>
							<li id="factor-item">Defense<a class="delete-factor"></a><input type="range" min="0" max="50" step="1" value="25" class="factor-slider"></li>
							<li id="factor-item">Attack<a class="delete-factor"></a><input type="range" min="0" max="50" step="1" value="25" class="factor-slider"></li>
						</ul>

					</div>

					<div id="go-rank" class="clickable">
						Rank!
					</div>

				</div>



				<!-- Screen 2: "Compare UI" - Comparisons -->
				<div id="compare-ui">

					<div id= "title-wrapper">
						<div class = "result-subheading" id="yourRankit">Your Rankit:</div>
						<div id="titleComp"></div>
					</div>

					<div id="question">
						Which is better in terms of
						<a id="decision-factor">
							Special Attack?
						</a>
					</div>

					<div class="choice-container">
						<div id="choices">					
							<div id="choice-1" class="choice">
							</div>

							<div id="choice-2" class="choice">
							</div>
						</div>
					</div>

					<br/>

					<div id = "progress">
						<div id = "progress-message"></div>
						<a id="skip-to-results">Skip to Results</a>
						<div id = "progressbar-container">
							<div id = "progress-bar"></div>
						</div>
					</div>
				</div>



				<!-- Screen 3: "Results UI" - Results -->
				<div id="results-ui">
					<div id= "title-wrapper">
						<div class = "result-subheading" id="yourRankit">Your Rankit:</div>
						<div id="titleComp">Pokemon</div>
					</div>

					<div class = "result-subheading">
						Optimal Decision:
					</div>

					<div id="result">
					</div>

					<div id="certainty-container">
						<div id="certainty" class="result-small">
							Certainty:
						</div>
						</br>
						<div id="certainty-percentage">
							<a id="certainty-val">88</a>%
						</div>
						<a id="finish-ranking">
							Finish Ranking
						</a>
					</div>

					</br>
					</br>

					<div class="result-subheading">
						Breakdown:
					</div>

					<div id="graph">
					</div>

					<input type="submit" id="save-rankit" class="button" name="save-rankit" value="Save">
					<input type="submit" id="share-rankit" class="button" name="share-rankit" value="Share">

				</div>
			</div>	
		</div>
	</body>
</html>
	
	