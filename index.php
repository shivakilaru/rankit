<?php
require_once "header.php";
session_start();
?>
	
	<body>
		<?php

			if (isset($_GET['id'])){
				$sql = "SELECT * FROM rankit WHERE id = ".$_GET['id'];
				$stmt = $pdo->query($sql);
				while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
				{
					$title = "'".(string)$row["title"]."'";
					$winner = "'".(string)$row["winner"]."'";
					$progress_percentage = "'".(string)$row["progress_percentage"]."'";
					$options = "'".(string)$row["options"]."'";
					$no_factors = "'".(string)$row["no_factors"]."'";
					$factor_names = "'".(string)$row["factor_names"]."'";
					$factor_weights = "'".(string)$row["factor_weights"]."'";
					$decisions = "'".(string)$row["decisions"]."'";
					$decision_count = "'".(string)$row["decision_count"]."'";
					$scores = "'".(string)$row["scores"]."'";
					$final_scores = "'".(string)$row["final_scores"]."'";

					echo('<script type="text/javascript">
						$(window).on("load", function() {
							reloadRankit('
								.$title.','
								.$winner.','
								.$progress_percentage.','
								.$options.','
								.$no_factors.','
								.$factor_names.','
								.$factor_weights.','
								.$decisions.','
								.$decision_count.','
								.$scores.','
								.$final_scores.');
						})
						</script>');
				}
			}
		?>

		<!-- ===== DELETE THIS, ONLY FOR TESTING THE LAST PAGE ==== -->
		<script type="text/javascript">
			$(document).ready(function(){
				// $('#add-ui').hide();
				// $('#results-ui').show();
			});
		</script>
	



			<div class="content-container hidden">
			
				<!-- Screen 1: "Add UI" -Adding Options and Factors -->
				<div id="add-ui">

					<div class="explanation">
						Rankit helps you make a decision. On the left, enter the options you’re trying to decide between, and on the right, enter the factors you’re judging them by. Weight the factors if necessary. Then press “Rank!”
					</div>

					<div class="get-title">
						<h2 id="title">Title</h2>
						<input type="text" id="title-box" maxlength=44 name="title" value=
						"Pokemon"/>

					</div>

					<div class="add-options">

						<h2 id="options">Options</h2>

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

						<h2 id="factors">Factors</h2>

						<input type="text" id="factor-box" name="factor"/>
						<a id="submit-factor"></a>

						<h4 class="list-header">Current List</h4>
						<ul id="factor-list">
							<li id="factor-item">Speed<a class="delete-factor"></a><input type="range" min="0" max="50" step="1" value="25" class="factor-slider"></li>
							<li id="factor-item">Defense<a class="delete-factor"></a><input type="range" min="0" max="50" step="1" value="25" class="factor-slider"></li>
							<li id="factor-item">Attack<a class="delete-factor"></a><input type="range" min="0" max="50" step="1" value="25" class="factor-slider"></li>
						</ul>

					</div>

					<div id="go-rank" class="clickable button">
						Rank!
					</div>

				</div>

				<div id="footer">
					<!-- just some cushion whitespace at the bottom.  could add text later -->
					</br>
				</div>



				<!-- Screen 2: "Compare UI" - Comparisons -->
				<div id="compare-ui">

					<div id= "title-wrapper">
						<div id="yourRankit">Your Rankit:</div>
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
						<div id = "yourRankit">Your Rankit:</div>
						<div class="rankitTitle"></div>
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

					<div id="random">
					</div>

					<div class="result-subheading">
						Breakdown:
					</div>

					<div id="graph">
					</div>

					<div id="save-rankit-container">
						<div id="save-rankit" class="button" name="save-rankit" value="Save">Save</div>
						<div id="logInPrompt" hidden>You must login in order to save a RankIt.</div>
					</div>
					<div id="share-rankit" class="button" name="share-rankit" value="Share">Share</div>

				</div>
			</div>	
		</div>
	</body>
</html>
	
	