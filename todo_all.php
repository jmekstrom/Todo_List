<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<link rel="stylesheet" href="bootstrap-social.css">
<link rel="stylesheet" href="style.css">

<div class="container-fuild">
    <div class="row">
        <div class="header col-xs-12">
            <div class="col-xs-7">
                <h1>Todo List</h1>
            </div>
            <div class="col-xs-5 logged_in">
                <!--Placeholder for account info -->
                <p>Hello, Jason <a href="">log out</a></p>
            </div>
        </div>
    </div>
    <div class="content_container">
        <?php
            include('pages/list_all_items.php');
        ?>
    </div>

    <div class="footer col-xs-12">
    </div>
</div>