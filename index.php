<?php
require_once "header.php";
session_start();

	// echo("DEBUGGING - CURRENT USER: ".$_SESSION['loggedIn'].' / '.$_SESSION['user_id']);

	echo('<script type="text/javascript">
				$(document).ready( function() {
					mixpanel.track("Index loaded");
				});
				</script>'
			);

	if (isset($_GET['id'])){
		$id = $_GET['id'];
		$sql = "SELECT id FROM rankit WHERE id = '".$_GET['id']."'";
		$stmt = $pdo->query($sql);
		$output = array();
		while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
		{
			array_push($output, $row);
		}
		if ((count($output)) < 1) {
			echo('<script type="text/javascript">window.location.href = "index.php";</script>'
			);
		}
		else {
			echo('<script type="text/javascript">
			$(window).on("load", function() {
				loadPersonalRankit('.$id.');})
			</script>'
			);
		}
	}

	else if (isset($_GET['take'])){
		$groupid = $_GET['take'];
		$sql = "SELECT id FROM rankit WHERE group_id = '".$_GET['take']."'";
		$stmt = $pdo->query($sql);
		$output = array();
		while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
		{
			array_push($output, $row);
		}

		echo('<script type="text/javascript">
					takingGroupRankit = true; 
				</script>');

		if ((count($output)) < 1) {
			echo('<script type="text/javascript">window.location.href = "index.php";</script>'
			);
		}
		else {
			if ($_SESSION['loggedIn'] == 0) {
				echo('<script type="text/javascript">currentGroupId = "'.$groupid.'";</script>');
				echo('<style>#add-ui{display:none;}</style>');
				echo('<div id="login-container">Please <a id="login" onClick="loginClicked();">log in</a> first.</div>');
			}
			else {
				$groupid = $_GET['take'];
				$newsql = "SELECT r.id FROM rankit r, users u WHERE r.user_id = u.id AND u.id = ".$_SESSION['user_id']." AND r.group_id = '".$_GET['take']."'";
				$newstmt = $pdo->query($newsql);
				while ($newrow=$newstmt->fetch(PDO::FETCH_ASSOC))
				{
					$takenRankit = $newrow['id'];
				}
				if (empty($takenRankit)) {
					echo('<script type="text/javascript">
						$(window).on("load", function() {
							takeGroupRankit("'.$groupid.'");})
						</script>'
					);
				}
				else {
					// echo(json_encode($takenRankit));
					echo('<script type="text/javascript">window.location.href = "index.php?id='.$takenRankit.'";</script>');
				}
			}
		}
	}

	else if (isset($_GET['groupid'])){
		$groupid = $_GET['groupid'];
		$sql = "SELECT id FROM rankit WHERE group_id = '".$_GET['groupid']."'";
		$stmt = $pdo->query($sql);
		$output = array();
		while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
		{
			array_push($output, $row);
		}
		if ((count($output)) < 1) {
			echo('<script type="text/javascript">window.location.href = "index.php";</script>'
			);
		}
		else {
			echo('<script type="text/javascript">
				$(window).on("load", function() {
					loadGroupRankit("'.$groupid.'");})
				</script>'
			);
		}
	}

?>


	
			<div class="content-container hidden">
			
				<!-- Screen 1: "Add UI" -Adding Options and Factors -->
				<div id="add-ui">

					<div class="explanation">
						Rankit helps you make a decision. First, give your decision a name. Then under "Options," enter the choices you’re trying to decide between. Under "Factors," enter attributes to compare your options by. Weight each attribute by it's importance to you. Then press “Rank!”
					</div>

					<div class="get-title">
						<h2 id="title">Name Your Decision</h2>
						<input type="text" id="title-box" maxlength=44 name="title" value="Best Car" onfocus="if (this.value == 'Best Car') {this.value = '';$(this).css('color', '#333');}"/>

					</div>

					<div class="add-options">

						<h2 id="options">Options</h2>

						<input type="text" id="option-box" name="option" value="i.e. Honda, Chevrolet, Ford" onfocus="if (this.value == 'i.e. Honda, Chevrolet, Ford') {this.value = '';$(this).css('color', '#333');}"/>
						<a id="submit-option"></a>

						<h4 class="list-header">Current List</h4>
						<ul id="option-list">
						</ul>

					</div>

					<div class="add-factors">

						<h2 id="factors">Factors</h2>

						<input type="text" id="factor-box" name="factor" value="i.e. Gas Mileage, Price, Luxury" onfocus="if (this.value == 'i.e. Gas Mileage, Price, Luxury') {this.value = '';$(this).css('color', '#333');}"/>
						<a id="submit-factor"></a>

						<h4 class="list-header">Current List</h4>
						<ul id="factor-list">
						</ul>

					</div>

					<div id="go-rank" class="clickable button">
						Rank!
					</div>

					<div id="footer">
						</br>
					</div>

				</div>



				<!-- Screen 2: "Compare UI" - Comparisons -->
				<div id="compare-ui">

					<div id= "title-wrapper">
						<div class="title-explanation">Title:</div>
						<div class="rankitTitle"></div>
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
						<div class="title-explanation">Title:</div>
						<div class="rankitTitle"></div>
					</div>

					<div class="clear"></div>

					<div id="result-container">
						<div class = "result-subheading optimal">
							Optimal Decision:
						</div>
						<div id="result">
						</div>
						<div id="tiebreaker-disclaimer">
						</div>
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

					<div class="clear"></div>

					<div id="group-rankit-links">
					</div>

					<div class="result-subheading">
						Breakdown:
					</div>

					<div id="graph">
					</div>

					<div class="post-rankit-actions">
						<div id="save-rankit" class="button" name="save-rankit" value="Save">Save</div>
						<div id="share-rankit" class="button" name="share-rankit" value="Share">Share</div>
					</div>

				</div>
			</div>	
		</div>
	</body>
</html>
	
	