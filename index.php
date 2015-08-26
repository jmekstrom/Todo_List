<?php
session_start();
//$_SESSION['userId'] = "jmekstrom";
if (!isset($_SESSION['userId'])){
    $_GET['current_page'] = "landing";
}
?>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="bootstrap-social.css">
<script>
    $(document).ready(function(){
        $(".newUserBtn").click(function(){
            <?php
            session_destroy();
            ?>
            location.reload();
        })

    })
</script>
<div class="container-fuild">
    <div class="row header_div">
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