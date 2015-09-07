<?php
session_start();
$username = $_POST['username'];
$password = sha1($_POST['password']);
require('../mysql_connect.php');
$query = "SELECT * FROM tdl_users WHERE username = '$username' AND password = '$password'";
$results = mysqli_query($conn, $query);
if(mysqli_num_rows($results) > 0){
    while($result = mysqli_fetch_assoc($results)){
        $user_info = $result;
    }
    $_SESSION["user_id"]= $user_info["id"];
    $user_info["success"] = true;
    $json_string = json_encode($user_info);
    print($json_string);

}else{
    $user_info = [];
    $user_info["success"] = false;
    $user_info["error"] = "your username or password is incorrect";
    $json_string = json_encode($user_info);
    print($json_string);
}

?>
