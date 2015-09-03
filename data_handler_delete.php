<?php

session_start();
$json_output = json_encode($_POST);
print($json_output);

//require('mysql_connect.php');
//$query = "";
//$results = mysqli_query($conn, $query);
//if(mysqli_num_rows($results) > 0){
//    while($result = mysqli_fetch_assoc($results)){
//        $user_info[] = $result;
//    }
//    $json_string = json_encode($user_info);
//    print($json_string);
//
//}

?>