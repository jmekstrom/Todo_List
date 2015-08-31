<?php
session_start();
if(isset($_SESSION['user'])){
    session_destroy();
    print("user logged out");
}

print_r()
?>