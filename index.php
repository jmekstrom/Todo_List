<?php
session_start();
print_r($_SESSION);
if (empty($_SESSION['user_id'])){

    $_GET['current_page'] = "login";
}
else{
    $_GET['current_page'] = "list_all_items";
}
?>
<?php
include_once('template/header.php');
?>
<div class="row header_div">
    <div class='header col-xs-12'>
        <div class='pull-left col-xs-6'>
            <h1>Todo List</h1>
        </div>
        <div class="col-xs-6 account_summary">
            <button class='btn btn-default pull-right' id="logoutBtn" onclick="logout_ajaxCall()">Log Out</button>
        </div>
    </div>
</div>
<div class="content_container">
    <?php
    include_once("pages/".$_GET['current_page'].".php");
    ?>
</div>
<div class="footer col-xs-12">
</div>


