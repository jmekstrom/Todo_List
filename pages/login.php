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
            <input type="text" class="form-control" id="username">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="password">
        </div>
        <button type="button" class="btn btn-success" id="loginBtn" onclick="login_ajaxCall()">Login</button>
    </form>
</div>

