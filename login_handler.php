<?php
$username = $_POST['username'];
$password = $_POST['password'];
$status = $_POST['login_status'];

$user_info = [
    ['id' => 1, 'username' => 'dpaschal@gmail.com', 'password' => 'fluffybunnies'],
    ['id' => 2, 'username' => 'rickybobby@gmail.com', 'password' => 'shakeandbake'],
    ['id' => 3, 'username' => 'darkhelmet@gmail.com', 'password' => '12345'],
    ['id' => 4, 'username' => 'jmekstrom@gmail.com', 'password' => 'password'],
    ['id' => 5, 'username' => 'feelafal@gmail.com', 'password' => 'sobad']
];

if($status == "login") {

    for ($i = 0; $i < count($user_info); $i++) {
        if ($username == $user_info[$i]['username']) {
            if ($password == $user_info[$i]['password']) {
                session_start();
                $_SESSION['user_id'] = $user_info[$i]['id'];
                $id = $_SESSION['user_id'];
                $message = $user_info[$i]['username'] . " is logged in";
                $output = ['success' => true, 'user_id' => $id, 'message' => $message];
                $output_string = json_encode($output);
                print_r($output_string);
            }
        }
    }
    if (!isset($_SESSION['user_id'])) {
        $message = 'username or password incorrect';
        $output = ['success' => false, 'message' => $message];
        $output_string = json_encode($output);
        print_r($output_string);
    }
}
else{
    session_destroy();
    $message = "session destroyed";
    $output = ['success' => true,'message' => $message];
    $output_string = json_encode($output);
    print_r($output_string);
}
?>
