<?php
session_start();
$user_id = $_SESSION['user_id'];
require('../mysql_connect.php');
$query = "SELECT * FROM tdl_item_list WHERE user_id='$user_id' ORDER BY complete ASC, due_date, priority,task";
$results = mysqli_query($conn, $query);
$i = 0;
date_default_timezone_set('America/Los_Angeles');
if(mysqli_num_rows($results) > 0){
    while($result = mysqli_fetch_assoc($results)){
        $i++;
        $user_info['data'][$i] = $result;
        $datetime = $user_info['data'][$i]['due_date'];
        $date = date("n/j/y g:ia",$datetime);
        if ($datetime == 2147483647) {
            $date = '';
        }
        $user_info['data'][$i]['due_date'] = $date;

        $datecreated = $user_info['data'][$i]['created_datetime'];
        $datec = date("n/j/y g:ia", $datecreated);
        $user_info['data'][$i]['created_datetime'] = $datec;
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