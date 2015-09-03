<?php

    session_start();
    $obj_id = $_POST["obj_id"];

    require('mysql_connect.php');
    $query = "DELETE FROM `tdl_item_list` WHERE id='$obj_id'";
    $results = mysqli_query($conn, $query);
    if(mysqli_affected_rows($conn) > 0){
        $return["success"] = "You deleted the object with an id of: $obj_id";
    }else {
        $return["success"] = "something went wrong";

    }

    $json_for_return = json_encode($return);
    print($json_for_return);

?>