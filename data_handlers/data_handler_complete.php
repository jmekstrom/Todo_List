<?php
session_start();
require('../mysql_connect.php');
$user_id = $_SESSION['user_id'];
$id = $_POST["task_data"]["id"];
$complete = $_POST["task_data"]["complete"];
$query = "UPDATE `tdl_item_list` SET `complete`= '$complete' WHERE user_id = '$user_id' AND id = '$id'";
$results = mysqli_query($conn,$query);
if (mysqli_affected_rows($conn) > 0) {
    $return["success"] = true;
    $return["message"] = "Task ".$id." complete is ".$complete;
} else {
    $return["success"] = false;
    $return["message"] = "Database was not updated";
    $return["post"] = $_POST;
}

$json_for_return = json_encode($return);
print($json_for_return);
?>