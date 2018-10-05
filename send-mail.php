<?php
require_once "Mail.php";
$message = '';
foreach( $_POST as $key => $value ) {
    $message .= $key . ": " . $value . "<br>";
} 

$from = 'fromaddress@gmail.com';
$to = 'alex.kar.008@gmail.com';
$subject = 'Hi!';
$body = $message;

$headers = array(
    'From' => $from,
    'To' => $to,
    'Subject' => $subject,
    'MIME-Version' => 1,
    'Content-type' => 'text/html;charset=iso-8859-1'
);

$smtp = Mail::factory('smtp', array(
        'host' => 'ssl://smtp.gmail.com',
        'port' => '465',
        'auth' => true,
        'username' => 'borodaworkmail@gmail.com',
        'password' => 'borodaworkmail123'
    ));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
    echo('not ok');
} else {
    echo('ok');
}