<?php
session_start();
$user_id = $_SESSION['user_id'];
require('mysql_connect.php');
$query = "SELECT * FROM tdl_item_list WHERE user_id='$user_id' ORDER BY complete ASC";
$results = mysqli_query($conn, $query);
if(mysqli_num_rows($results) > 0){
    while($result = mysqli_fetch_assoc($results)){
        $user_info['data'][] = $result;
    }
    $user_info['success'] = true;
    $json_string = json_encode($user_info);
}
elseif(mysqli_num_rows($results) == 0){
    $user_info['success'] = true;
    $user_info['data'] = [];
    $json_string = json_encode($user_info);
}
else{
    $user_info['success'] = false;
    $json_string = json_encode($user_info);
}
print($json_string);
?>