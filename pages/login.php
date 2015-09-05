<div class="row header_div">
    <div class='header col-xs-12'>
        <div class='pull-left col-xs-6'>
            <h1>Todo List</h1>
        </div> <!--End pull-left col-xs-6-->
        <div class="col-xs-6 account_summary">
            <button class='btn btn-default pull-right' id="createBtn" data-toggle="modal" data-target="#createmodal">Create Account</button>
        </div>
    </div> <!-- end header col-xs-12-->
</div> <!--end row header_div-->
<div class="register">
    <h2 class="page-header">Log in</h2>

    <form role="form">
        <button class="btn btn-block btn-social btn-facebook facebook">
            <i class="fa fa-facebook"></i> Log in with Facebook
        </button>
        <button class="btn btn-block btn-social btn-twitter">
            <i class="fa fa-twitter"></i> Log in with Twitter
        </button>
        <button class="btn btn-block btn-social btn-google">
            <i class="fa fa-google"></i> Log in with Google
        </button>
        <div class="page-header space">
        </div>
        <div class="form-group">
            <label for="text">Email address:</label>
            <input type="text" class="form-control" id="username" value="amattingley">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="password" value="getpitted">
        </div>
        <button type="button" class="btn btn-success" id="loginBtn">Login</button>
    </form>
</div>



<!-- Modal -->
<div id="createmodal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Create an Account</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username" id="username_create">
                </div>

                <div class="form-group">
                    <input type="password" class="form-control" placeholder="password" id="password_create">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="email" id="email_create">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-dismiss="modal" id="create_user" onclick="create_user()">
                    Submit
                </button>
            </div>
        </div>

    </div>
</div>

