<?php
 // $pdo = new PDO('mysql:host=sql100.byethost8.com;dbname=b8_13744073_RankIt', 'b8_13744073', '711442');
// $pdo = new PDO('mysql:host=localhost;dbname=shivakil_RankIt','shivakil','493;rankit');
$pdo = new PDO('mysql:host=127.0.0.1;dbname=RankIt','root');
// $pdo = new PDO('mysql:host=localhost;dbname=RankIt','root','root');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);