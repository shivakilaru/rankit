<?php
require_once "../db.php";
session_start();

header('Content-Type: application/json');



if (isset($_GET['fakeLogin'])){
	$fake_user_id = 31;

	$_SESSION['loggedIn'] = true;
	$_SESSION['user_id'] = $fake_user_id;

	$sql = "SELECT * FROM users WHERE id = ".$fake_user_id;
	$stmt = $pdo->query($sql);
	while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
	{
		$_SESSION['first_name'] = $row['first_name'];
		$_SESSION['last_name'] = $row['last_name'];
	}
	echo("Fake login successful.");
}

else if (isset($_GET['fakeLogout'])){
	$_SESSION['loggedIn'] = false;
	$_SESSION['user_id'] = 0;
	$_SESSION['first_name'] = '';
	$_SESSION['last_name'] = '';
	echo("Fake logout successful.");
}

else if (isset($_GET['isLoggedIn'])){
	if ($_SESSION['loggedIn'] == true) {
		echo($_SESSION['user_id']);
	}
	else {
		echo(0);
	}
}

else if (isset($_GET['id'])){
	$sql = "SELECT * FROM rankit WHERE id = ".$_GET['id'];
	$stmt = $pdo->query($sql);
	while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
	{
		$output = $row;
	}
	echo(json_encode($output));
}

else if (isset($_GET['sub-id'])){
	$sql = "SELECT u.id, u.first_name, u.last_name, r.* FROM rankit r, users u WHERE u.id = r.user_id AND r.id = ".$_GET['sub-id'];
	$stmt = $pdo->query($sql);
	while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
	{
		$output = $row;
	}
	echo(json_encode($output));
}

else if (isset($_GET['groupid'])){
	$sql = "SELECT u.id AS user_id, u.first_name, u.last_name, r.* FROM users u, rankit r WHERE u.id = r.user_id AND r.id in (SELECT r.id FROM rankit r WHERE r.group_id = '".$_GET['groupid']."')";
	$stmt = $pdo->query($sql);
	$output = array();
	while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
	{
		array_push($output, $row);
	}
	echo(json_encode($output));
}

else if (isset($_GET['take'])){
	$sql = "SELECT group_id, title, factor_names, options, factor_weights FROM rankit WHERE is_owner = 1 AND group_id = '".$_GET['take']."'";
	$stmt = $pdo->query($sql);
	while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
	{
		$output = $row;
	}
	echo(json_encode($output));
}

else if (
	isset($_POST['id']) && 
	isset($_POST['userId']) && 
	isset($_POST['title']) && 
	isset($_POST['groupId']) && 
	isset($_POST['isOwner']) && 
	isset($_POST['winner']) && 
	isset($_POST['progressPercentage']) && 
	isset($_POST['optionStr']) &&
	isset($_POST['noFactorsStr']) && 
	isset($_POST['factorNamesStr']) && 
	isset($_POST['factorWeightsStr']) && 
	isset($_POST['decisionsStr']) && 
	isset($_POST['decisionCount']) && 
	isset($_POST['scoresStr']) &&
	isset($_POST['finalScoresStr'])) 
{
	if ($_POST['id'] == 0) {
		$id = NULL;
	}
	else {
		$id = ($_POST['id']);
	}

	$sql = 	"INSERT INTO rankit (
				id,
				user_id,
				date, 
				title, 
				group_id,
				is_owner,
				winner, 
				progress_percentage, 
				options,
				no_factors,
				factor_names, 
				factor_weights,
				decisions,
				decision_count,
				scores, 
				final_scores ) 
				VALUES (
					:id,
					:user_id,
					:date, 
					:title, 
					:group_id,
					:is_owner,
					:winner, 
					:progressPercentage, 
					:options,
					:no_factors,
					:factor_names, 
					:factor_weights,
					:decisions,
					:decision_count,
					:scores, 
					:final_scores)
				ON DUPLICATE KEY UPDATE 
					winner = VALUES(winner),
					progress_percentage = VALUES(progress_percentage),
					decisions = VALUES(decisions),
					decision_count = VALUES(decision_count),
					scores = VALUES(scores),
					final_scores = VALUES(final_scores)";

	$stmt = $pdo->prepare($sql);
	$stmt->execute(array(
		':id'						=> 	$id,
		':user_id'					=> 	$_POST['userId'],
		':date'						=> 	date("Y-m-d H:i:s"),
		':title'					=> 	$_POST['title'],
		':group_id'					=> 	$_POST['groupId'],
		':is_owner'					=> 	$_POST['isOwner'],
		':winner'					=>	$_POST['winner'],
		':progressPercentage'		=>	$_POST['progressPercentage'],
		':options'					=>	$_POST['optionStr'],
		':no_factors'				=>	$_POST['noFactorsStr'],
		':factor_names'				=>	$_POST['factorNamesStr'],
		':factor_weights'			=>	$_POST['factorWeightsStr'],
		':decisions'				=>	$_POST['decisionsStr'],
		':decision_count'			=>	$_POST['decisionCount'],
		':scores'					=>	$_POST['scoresStr'],
		':final_scores'				=>	$_POST['finalScoresStr']
	));			
}