<?php
session_start();

$username = $_POST['username'];
$password = sha1($_POST['password']);
$email = $_POST['email'];
require('mysql_connect.php');
$query = "INSERT INTO `tdl_users`(`id`, `username`, `email`, `password`, `deleted`) VALUES (null,'$username','$email','$password','0')";
$results = mysqli_query($conn, $query);
if(mysqli_affected_rows($conn) > 0){
    $json_for_return = json_encode($_POST);
    print($json_for_return);
}else {
    print('something is not working, its probably the id breaking things again.');
}
?>