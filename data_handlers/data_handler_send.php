<?php
session_start();
date_default_timezone_set('America/Los_Angeles');
if(!empty($_SESSION['user_id'])){
    foreach($_POST['task_data'] as $key => $value){
        $_POST['task_data'][$key]=addslashes($value);
    }
    $complete = $_POST["task_data"]["complete"];
    $created_datetime = $_POST["task_data"]["created_datetime"];
    $details = $_POST["task_data"]["details"];
    $due_date = strtotime($_POST["task_data"]["due_date"]);
    if (empty($due_date)) {
        $due_date = 2147483647;
    }
    $id = null;
    $priority = $_POST["task_data"]["priority"];
    $task= $_POST["task_data"]["task"];
    $user_id = $_SESSION['user_id'];
    require('../mysql_connect.php');
    $query = "INSERT INTO `tdl_item_list`(`id`, `task`, `details`, `created_datetime`, `user_id`, `complete`, `priority`, `due_date`) VALUES ('$id','$task','$details','$created_datetime','$user_id','$complete','$priority','$due_date')";
    $results = mysqli_query($conn, $query);
    if(mysqli_affected_rows($conn) > 0){
        $json_for_return = json_encode($_POST["task_data"]);
        print($json_for_return);
        //print('mysqli_affected_rows is true');
        //print_r($results);
    }else {
        print('something is not working, its probably the id breaking things again.');
    }
}else{
    print('you are either logged out or your credentials are wrong');
}

?>