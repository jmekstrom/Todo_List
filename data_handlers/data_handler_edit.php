<?php
session_start();
date_default_timezone_set('America/Los_Angeles');
require('mysql_connect.php');
$user_id = $_SESSION['user_id'];
$id = $_POST["task_data"]["id"];
$task = $_POST["task_data"]["task"];
$due_date = strtotime($_POST["task_data"]["due_date"]);
if (empty($due_date)) {
    $due_date = 2147483647;
}
$priority = $_POST["task_data"]["priority"];
$details = $_POST["task_data"]["details"];
$query = "UPDATE `tdl_item_list` SET `task`= '$task',`due_date`= '$due_date',`priority`= '$priority',`details`= '$details' WHERE user_id = '$user_id' AND id = '$id'";
$results = mysqli_query($conn, $query);
if (mysqli_affected_rows($conn) > 0) {
    $return["success"] = true;
    $return["message"] = "Task " . $id . " was updated";
} else {
    $return["success"] = false;
    $return["message"] = "Database was not updated".$due_date_unix;
    $return["post"] = $_POST;
}

$json_for_return = json_encode($return);
print($json_for_return);
?>