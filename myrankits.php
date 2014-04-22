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
						echo('<h2 class="myRankitHeader">Individual RankIts</h2>');
						while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {

							echo('<li class="myrankit-item">');
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
						echo('</br>');
						$groupRankitSQL = 'SELECT * FROM rankit WHERE user_id = '.$_SESSION['user_id'].' AND group_id in (SELECT group_id FROM rankit GROUP BY group_id HAVING COUNT(*) > 1)';
						$groupSTMT = $pdo->query($groupRankitSQL);
						if ($groupSTMT->rowCount() > 0){
							echo('<ul id="myrankit-list">');
							echo('<h2 class="myRankitHeader">Group RankIts</h2>');
							while ($groupRow = $groupSTMT->fetch(PDO::FETCH_ASSOC)) {
								echo('<li class="myrankit-item">');
								echo('<a href="index.php?groupid='.$groupRow['group_id'].'"><div class="myrankit-title">'.$groupRow['title'].'</div></a>');
								// echo('
								// 	<a class="myrankit-decision" href="">Edit My Decision: </span>
								// 	<span class ="user-decision">'.$groupRow['winner'].'</span></div>
								// 	<div class="myrankit-certainty"><span>Certainty: </span>
								// 	<span class="user-certainty">'.$groupRow['progress_percentage'].'</span></div>
								// 	<!--<div class="editAndShare"><span>Edit </span><span>Share</span></div>-->
								// ');
								echo('
									<a class="myrankit-decision" href="index.php?id='.$groupRow['id'].'">View My Decision</a>');
							}
							echo('</ul>');
						}
					}
				?>
			</div>	
		</div>
	</body>
</html>
	
	