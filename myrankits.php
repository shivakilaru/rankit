<?php
require_once "header.php";
session_start();

	$groupIdList = array();
?>
	
	

	<body>
			<div class="content-container">
				<h2 style="font-weight:300;">MY RANKITS</h2>

				<?php

					$sql = "SELECT * FROM rankit WHERE user_id = ".$_SESSION['user_id'];
					$stmt = $pdo->query($sql);
					
					if ($stmt->rowCount()==0) {
						echo('<h1>No RankIts here!</h1>');
					}

					else {
						echo('<ul id="myrankit-list">');
						echo('<h2>Individual RankIts</h2>');
						while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
							
							//Search for GroupRankIts while iterating through RankIts
							$GroupSearchSQL = "SELECT * FROM rankit WHERE group_id = ".$row['group_id'].";";
							// if ($GroupSearchSQL)

							echo('
								<li class="myrankit-item">');
							if ($row['group_id'] != 0) {
								echo('<a href="index.php?groupid='.$row['group_id'].'"><div class="myrankit-title">'.$row['title'].'</div></a>');
							}
							else {
								echo('<a href="index.php?id='.$row['id'].'"><div class="myrankit-title">'.$row['title'].'</div></a>');
							}
							echo('
								<div class="myrankit-decision"><span>Decision: </span>
								<span class ="user-decision">'.$row['winner'].'</span></div>
								<div class="myrankit-certainty"><span>Certainty: </span>
								<span class="user-certainty">'.$row['progress_percentage'].'</span></div>
								<!--<div class="editAndShare"><span>Edit </span><span>Share</span></div>-->
								');
						}
						echo('</ul>');
					
						//Check for Group RankIts
						//if
					}

				?>
			</div>	
		</div>
	</body>
</html>
	
	