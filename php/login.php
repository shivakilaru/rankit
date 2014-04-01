<?php 
require_once 'openid.php';
require_once 'db.php';
session_start();

echo('<form action="?login" method="post">
       <button class="btn-large btn-success">Login with Google</button>
    </form>');

echo('<a href="https://www.google.com/accounts/Logout?continue=
    https://appengine.google.com/_ah/logout?continue=
    http://rankit.com/login.php"> 
    <button class="btn-large btn-primary btn-danger" 
            type="button">Logout of Google</button></a>');

try {
    $openid = new LightOpenID('http://rankit.com/');
    if(!$openid->mode) {
        if(isset($_GET['login'])) {
            $openid->identity = 'https://www.google.com/accounts/o8/id';
            $openid->required = array('contact/email', 'namePerson/first', 
                'namePerson/last');
            $openid->optional = array('namePerson/friendly');
            header('Location: ' . $openid->authUrl());
        }
?>

<?php
    } else if($openid->mode == 'cancel') {
        echo 'User has canceled authentication!';
    } else if ( ! $openid->validate() ) {
        echo 'You were not logged in by Google.  It may be due to a technical problem.';
    } else {
        $identity = $openid->identity;
        $userAttributes = $openid->getAttributes();
        if (in_array($userAttributes['contact/email'], $permissions)) {
            $_SESSION['loggedIn'] = 'True';
            $_SESSION['userEmail'] = $userAttributes['contact/email'];
            header('Location: index.php');
        }
        else {
            echo("<h4>This is not an authorized email address.</h4>");
        }

    }
} catch(ErrorException $e) {
    echo $e->getMessage();
}

?>