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
    </div>
    <div class="content_container">
        <?php
        include_once("pages/".$_GET['current_page'].".php");
        ?>
    </div>
    <div class="footer col-xs-12">
    </div>
</div>

