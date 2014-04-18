<?php
require_once "db.php";

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



	/* ================================
	    __  __               __         
	   / / / /__  ____ _____/ /__  _____
	  / /_/ / _ \/ __ `/ __  / _ \/ ___/
	 / __  /  __/ /_/ / /_/ /  __/ /    
	/_/ /_/\___/\__,_/\__,_/\___/_/     
	                                    
	================================== */

echo('
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
	
	<body>
	
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

			</div>

			<hr/>



			<div class="content-container">
				<h2 style="font-weight:300;">BROWSE</h2>

				<div class="browseGrid">
');	//End Echo - Header

	/* ================================
	    ____              __   _ __      
	   / __ \____ _____  / /__(_) /______
	  / /_/ / __ `/ __ \/ //_/ / __/ ___/
	 / _, _/ /_/ / / / / ,< / / /_(__  ) 
	/_/ |_|\__,_/_/ /_/_/|_/_/\__/____/  
                                   
	================================== */

$sql = 'SELECT * FROM rankit';
$stmt = $pdo->query($sql);
$count = 0;
while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
{
	//Retrieve User Information
	$results = [];	//Clear previous image results

	$userSQL = 'SELECT * FROM users WHERE id = '.$row['user_id'];
	$userSTMT = $pdo->query($userSQL);
	$userRow = $userSTMT->fetch(PDO::FETCH_ASSOC);

	//Retrieve Picture for Rankit

	$imageQueryString = $row['name'];
	$imageQueryString = str_replace(' ','%20',$imageQueryString);
	$image_query = $url.$imageQueryString;

	$json = get_url_contents($image_query);
	$data = json_decode($json);
	foreach ($data->responseData->results as $result) {
    $results[] = array('url' => $result->url, 'alt' => $result->title);
	}

	echo('<div class ="browseBox">');
	echo('<img class="browseBox-pic" src='.$results[0]['url'].'>');
	echo('<h4 class="browseBox-title">'.$row['name'].'</h4>');
	echo('<span class="browseBox-author">By: '.$userRow['first_name'].' '.
		$userRow['last_name'].'</span>');
	echo('</div>');
}

echo('					
				</div>	
			</div>	
		</div>
	</body>
</html>
');

?>
	