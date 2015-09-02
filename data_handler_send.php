<?php
session_start();

if(!empty($_SESSION['user_id'])){
    print($_POST["task_data"]["complete"]);
    $complete = "0";
    $created_datetime = "0000-00-00";
    $details = "details of task";
    $due_date = "0000-00-00";
    $id = null;
    $priority = "low";
    $timestamp = "0000-00-00";
    $task= "test item title";
    $user_id = $_SESSION['user_id'];
    require('mysql_connect.php');
    $query = "INSERT INTO `tdl_item_list`(`id`, `task`, `details`, `created_datetime`, `user_id`, `complete`, `priority`, `due_date`) VALUES ('$id','$task','$details','$created_datetime','$user_id','$complete','$priority','$due_date')";
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