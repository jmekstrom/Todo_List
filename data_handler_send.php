<?php
session_start();
print_r($_SESSION);

if(!empty($_SESSION['user_id'])){
    print_r($_POST);
    $complete = "0"
    $task= "test item title";
    $details = "details"
    $timestamp = "0000-00-00"
    $user_id = $_SESSION['user_id'];
    require('mysql_connect.php');
    $query = "INSERT INTO `tdl_item_list`(`complete`,`created_datetime`, `details`, `due_date`, `id`, `priority`,`task`, `user_id`) VALUES ($complete, $created_datetime, )";
    $results = mysqli_query($conn, $query);
    if(mysqli_affected_rows($conn) > 0){
        print('mysqli_affected_rows is true');
        print_r($results);
    }else {
        print('something is not working, its probably the id breaking things again.');
    }
}else{
    print('you are either logged out or your credentials are wrong');
}
?>