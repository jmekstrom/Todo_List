<?php
session_start();
if(isset($_SESSION['user_id'])){
    session_destroy();
    print("user logged out");
}
?>