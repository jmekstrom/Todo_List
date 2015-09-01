<?php
session_start();
$user_id = $_SESSION['user_id'];
require('mysql_connect.php');
$query = "SELECT * FROM tdl_item_list WHERE id='$user_id'";
$results = mysqli_query($conn, $query);
if(mysqli_num_rows($results) > 0){
    while($result = mysqli_fetch_assoc($results)){
        $user_info[] = $result;
    }
    $json_string = json_encode($user_info);
    print($json_string);

}
?>