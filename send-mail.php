<?php

$message = '';
foreach( $_POST as $key => $value ) {
    $message .= $key . ": " . $value . "<br>";
} 

$headers = 'From: webmaster@example.com' . "\r\n";
$headers .= "Content-Type: text/html; charset=utf-8";
$subject = 'Данные с карточки';

$isMailSended =  mail('alex.kar.008@gmail.com', $subject, $message, $headers);

if($isMailSended){
    echo 'ok';
} else {
    echo('not ok');
}