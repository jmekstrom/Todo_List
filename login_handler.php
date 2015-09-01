//<?php
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
//?>

<?php

require('mysql_connect.php');
$query = "SELECT * FROM tdl_users";
$results = mysqli_query($conn, $query);
if(mysqli_num_rows($results) > 0){
    while($result = mysqli_fetch_assoc($results)){
        $user_info[] = $result;
    }
    print('query working');
}

$output = array();

$user_info_length = count($user_info);
$user_cycle = 0; //this variable is in place to prevent multiple error messages when a user inputs an incorrect password

foreach ($user_info as  $key => $value) { //cycle through $user_info array and tap into keys and values
    if($_POST['username'] == $value['username']){
        $username = $_POST['username'];
        $_SESSION['user_id'] = $value['id'];
        if($_POST['password'] == $value['password']){//nested conditional to make sure that it only tests the password of the current user
            $output['success'] = true;
            $output['user_id'] = $_SESSION['user_id'];
            $output['message'] = "Welcome $username";
        }else{
            $output['failure'] = "password or username is incorrect";
        }
    }else{
        $user_cycle++;
        if($user_cycle == $user_info_length){
            $output['failure'] = "password or username is incorrect";
        }
    }
}

print_r($output);//this is what we are going to access in the ajax call.
//print_r($_SESSION);

?>
