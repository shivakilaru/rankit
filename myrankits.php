<?php
require_once "header.php";
session_start();

	//Redirect if attempting to view page without logging in
	if (!isset($_SESSION['loggedIn'])) {
		header( 'Location: index.php' ) ;
	}

	

	//$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>
	
	

	<body>
			<div class="content-container">
				<h2 style="font-weight:300;">MY RANKITS</h2>

				<?php

					$sql = "SELECT * FROM rankit WHERE user_id = ".$_SESSION['user_id'];
					$stmt = $pdo->query($sql);
					
					if ($stmt->rowCount()==0) {
						echo('<h1>No RankIt\'s here!</h1>');
					}

					else {
						echo('<ul id="myrankit-list">');
						while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
							echo('
								<li class="myrankit-item">
								<div class="myrankit-title">'.$row['title'].'</div>
								<div class="myrankit-decision"><span>Decision: </span>
								<span class ="user-decision">'.$row['winner'].'</span></div>
								<div class="myrankit-certainty"><span>Certainty: </span>
								<span class="user-certainty">'.$row['progress_percentage'].'</span></div>
								<div class="editAndShare"><span>Edit </span><span>Share</span></div>
								');
						}
						echo('</ul>');
					}

				?>
			</div>	
		</div>
	</body>
</html>
	
	