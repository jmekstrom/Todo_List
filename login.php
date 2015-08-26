<?php
session_start();
$_SESSION['userId'] = "jmekstrom";
$page = "list_all_items";

header("location: index.php?current_page=$page");
?>