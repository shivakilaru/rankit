<?php
require_once "header.php";
session_start();

	/* =======================================================================
	    ____  __  ______     ______                 __  _                 
	   / __ \/ / / / __ \   / ____/_  ______  _____/ /_(_)___  ____  _____
	  / /_/ / /_/ / /_/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
	 / ____/ __  / ____/  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  ) 
	/_/   /_/ /_/_/      /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/  
                                                                      
	======================================================================= */

	function get_url_contents($url) {
	    $crl = curl_init();

	    curl_setopt($crl, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
	    curl_setopt($crl, CURLOPT_URL, $url);
	    curl_setopt($crl, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($crl, CURLOPT_CONNECTTIMEOUT, 5);

	    $ret = curl_exec($crl);
	    curl_close($crl);
	    return $ret;
	}

	$url = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=';

	echo('
				<div class="content-container">
					<h2 style="font-weight:300;">BROWSE</h2>

					<div class="browseGrid">
	');


	/* ================================
	    ____              __   _ __      
	   / __ \____ _____  / /__(_) /______
	  / /_/ / __ `/ __ \/ //_/ / __/ ___/
	 / _, _/ /_/ / / / / ,< / / /_(__  ) 
	/_/ |_|\__,_/_/ /_/_/|_/_/\__/____/  
                                   
	================================== */

	$sql = 'SELECT * FROM rankit';
	$stmt = $pdo->query($sql);
	$first_name;
	$last_name;

	while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
	{
		//Retrieve User Information
		$results = array();	//Clear previous image results

		if ($row['user_id'] != NULL) {
			$userSQL = "SELECT * FROM users WHERE id = ".$row['user_id'];
			$userSTMT = $pdo->query($userSQL);
			$userRow = $userSTMT->fetch(PDO::FETCH_ASSOC);
			$first_name = $userRow['first_name'];
			$last_name = $userRow['last_name'];
		}
		else {
			$first_name = 'Anonymous';
			$last_name = '';
		}

		//Retrieve Picture for Rankit
		$imageQueryString = $row['title'];
		$imageQueryString = str_replace(' ','%20',$imageQueryString);
		$image_query = $url.$imageQueryString;

		$json = get_url_contents($image_query);
		$data = json_decode($json);
		foreach ($data->responseData->results as $result) {
	    $results[] = array('url' => $result->url, 'alt' => $result->title);
		}

		echo('<a href="index.php?id='.$row['id'].'">');
			echo('<div class ="browseBox">');
				echo('<img class="browseBox-pic" src='.$results[3]['url'].'>');
				echo('<h4 class="browseBox-title">'.$row['title'].'</h4>');
				echo('<span class="browseBox-author">By: '.$first_name.' '.$last_name.'</span>');
			echo('</div>');
		echo('</a>');
	}

	echo('					
					</div>	
				</div>	
			</div>
		</body>
	</html>
	');

?>
	