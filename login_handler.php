<?php
session_start();

$output=[
    'success'=>false,
    'user'=>null,
    'errors'=>[],
    'destination'=>''
];
if($_POST['username']=='AlexMattingley'){//this is checking the information sent from perform_login
    if($_POST['password']=='test'){
        $_SESSION['user'] = [];
        $_SESSION['user']['id'] = 5;
        $_SESSION['user']['username'] = $_POST['username'];
        $output['user']=$_SESSION['user'];
        $output['success']=true;
        $output['destination']='list_all_items';
    }
    else{
        //password is wrong
        $output['errors'][]='Invalid password or username';
    }
}
else{
    //username is wrong
    $output['errors'][]='Invalid username or password';
}
print(json_encode($output));


?>
