<?php
require_once "db.php";
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);

echo("<style>body{font-family:sans-serif;}td{padding:10px;}</style>");




/* ===================================================================
   __  __                  ____        __        __                  
  / / / /_______  _____   / __ \____ _/ /_____ _/ /_  ____ _________ 
 / / / / ___/ _ \/ ___/  / / / / __ `/ __/ __ `/ __ \/ __ `/ ___/ _ \
/ /_/ (__  )  __/ /     / /_/ / /_/ / /_/ /_/ / /_/ / /_/ (__  )  __/
\____/____/\___/_/     /_____/\__,_/\__/\__,_/_.___/\__,_/____/\___/ 
 
===================================================================*/

//Check if adding user to database
if (isset($_POST['google_id']) && isset($_POST['first']) && isset($_POST['last']))
{
	//Check that user isn't already in database
	$sql = "SELECT * FROM users WHERE google_id LIKE ".$_POST['google_id'];
	$query_sql = $pdo->query($sql);

	if ($query_sql->rowCount() == 0)
	{
		$sql = "INSERT INTO users (google_id, first_name, 
		last_name) VALUES (:google_id, :first, :last)";
		$stmt = $pdo->prepare($sql);
		$stmt->execute(array(
			':google_id' 	=>	$_POST['google_id'],
			':first' 		=>	$_POST['first'],
			':last' 		=> $_POST['last']
		));
	}
}

//Create structure of user table
echo('<h2>USER DATABASE</h2>');

echo('<table>');
echo('<tr>');
	echo('<td>Google ID</td>');
	echo('<td>First</td>');
	echo('<td>Last</td>');
echo('</tr>');

//Display contents of user table
$stmt = $pdo->query("SELECT * FROM users");
while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
{
	echo('<tr>');
		echo('<td>'.$row['google_id'].'</td>');
		echo('<td>'.$row['first_name'].'</td>');
		echo('<td>'.$row['last_name'].'</td>');
	echo('</tr>');
}
echo('</table>');






/* ============================================================================
    ____              __   _ __     ____        __        __                  
   / __ \____ _____  / /__(_) /_   / __ \____ _/ /_____ _/ /_  ____ _________ 
  / /_/ / __ `/ __ \/ //_/ / __/  / / / / __ `/ __/ __ `/ __ \/ __ `/ ___/ _ \
 / _, _/ /_/ / / / / ,< / / /_   / /_/ / /_/ / /_/ /_/ / /_/ / /_/ (__  )  __/
/_/ |_|\__,_/_/ /_/_/|_/_/\__/  /_____/\__,_/\__/\__,_/_.___/\__,_/____/\___/ 
                                                                              
============================================================================*/

//Check if adding Rankit to database

if (isset($_POST['title']) && 
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
	//$query_sql = $pdo->query("SELECT id FROM users WHERE id ")

	$sql = 	"INSERT INTO rankit (
				date, 
				title, 
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
					:date, 
					:title, 
					:winner, 
					:progressPercentage, 
					:options,
					:no_factors,
					:factor_names, 
					:factor_weights,
					:decisions,
					:decision_count,
					:scores, 
					:final_scores)";

	$stmt = $pdo->prepare($sql);
	$stmt->execute(array(
		':date'						=> 	date("Y-m-d H:i:s"),
		':title'					=> 	$_POST['title'],
		':winner'					=>	$_POST['winner'],
		':progressPercentage'		=>	$_POST['progressPercentage'],
		':options'					=>	$_POST['optionStr'],
		':no_factors'				=>	$_POST['noFactorsStr'],
		':factor_names'				=>	$_POST['factorNamesStr'],
		':factor_weights'			=>	$_POST['factorWeightsStr'],
		':decisions'				=>	$_POST['decisionsStr'],
		':decision_count'			=>	$_POST['decisionCount'],
		':scores'					=>	$_POST['scoresStr'],
		':final_scores'				=>	$_POST['finalScoreStr']
	));			
}

//Create structure of rankit table
echo('<br/><br/><br/>');
echo('<h2>RANKIT DATABASE</h2>');
echo('<table>');
echo('<tr>');
	echo('<td>Date</td>');
	echo('<td>Title</td>');
	echo('<td>Winner</td>');
	echo('<td>ProgressPercentage</td>');
	echo('<td>Options</td>');
	echo('<td>Factor Names</td>');
	echo('<td>Factor Weights</td>');
	echo('<td>Decisions</td>');
	echo('<td>Decision Count</td>');
	echo('<td>Scores</td>'); 
	echo('<td>Final Scores</td>'); 
echo('</tr>');

//Display contents of rankit table
$stmt = $pdo->query("SELECT * FROM rankit");
while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
{
	echo('<tr>');
		echo('<td>'.$row['date'].'</td>');
		echo('<td>'.$row['title'].'</td>');
		echo('<td>'.$row['winner'].'</td>');
		echo('<td>'.$row['progress_percentage'].'</td>');
		echo('<td>'.$row['option_str'].'</td>');
		echo('<td>'.$row['factor_names'].'</td>');
		echo('<td>'.$row['factor_weights'].'</td>');
		echo('<td>'.$row['decisions'].'</td>');
		echo('<td>'.$row['decision_count'].'</td>');
		echo('<td>'.$row['scores'].'</td>');
		echo('<td>'.$row['final_scores'].'</td>');
	echo('</tr>');
}
echo('</table>');

?>