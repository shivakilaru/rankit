<?php
// $pdo = new PDO('mysql:host=sql100.byethost8.com;dbname=b8_13744073_RankIt', 'b8_13744073', '711442');
//$pdo = new PDO('mysql:host=sara.asmallorange.com:2083;dbname=shivakil_RankIt','shivakil','493;rankit');
$pdo = new PDO('mysql:host=127.0.0.1;dbname=RankIt','root');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);