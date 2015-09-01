<?php
session_start();
//session_start();
//
//$output=[
//    'success'=>false,
//    'user'=>null,
//    'errors'=>[],
//    'destination'=>''
//];
//if($_POST['username']=='AlexMattingley'){//this is checking the information sent from perform_login
//    if($_POST['password']=='test'){
//        $_SESSION['user'] = [];
//        $_SESSION['user']['id'] = 5;
//        $_SESSION['user']['username'] = $_POST['username'];
//        $output['user']=$_SESSION['user'];
//        $output['success']=true;
//        $output['destination']='list_all_items';
//        $output['session'] = $_SESSION;
//    }
//    else{
//        //password is wrong
//        $output['errors'][]='Invalid password or username';
//    }
//}
//else{
//    //username is wrong
//    $output['errors'][]='Invalid username or password';
//}
//print(json_encode($output));
//
//
?>

<?php

$username = $_POST['username'];
$password = sha1($_POST['password']);
require('mysql_connect.php');
$query = "SELECT * FROM tdl_users WHERE username = '$username' AND password = '$password'";
$results = mysqli_query($conn, $query);
if(mysqli_num_rows($results) > 0){
    while($result = mysqli_fetch_assoc($results)){
        $user_info = $result;
    }
    $_SESSION["user_id"]= $user_info["id"];
    $user_info["success"] = true;
    $json_string = json_encode($user_info);
    print($json_string);

}else{
    $user_info = [];
    $user_info["success"] = false;
    $user_info["error"] = "your username or password is incorrect";
    $json_string = json_encode($user_info);
    print($json_string);
}

?>
