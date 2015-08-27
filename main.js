
function login_ajaxCall() {
    var username = $('#username').val();
    var password = $('#password').val();
    var login_status = "login";
    $.ajax({
        url: "login_handler.php",
        data: {username, password, login_status},
        cache: false,
        method: "POST",
        dataType: "json",
        success: function (data) {
            if (data.success) {
                console.log("login successful", data);
                load_content("list_all_items");
            }
            else {
                console.log("login failed", data);
                load_content("login");
            }
        },
        error: function(data){
            console.log(data);
        }
    })
}

function load_content(url){
    console.log("loading: "+url+".php");
    $.ajax({
        url: "pages/"+ url +".php",
        data: {},
        dataType: 'html',
        success: function(response){
            $(".content_container").html(response);
            window.history.pushState('test','test','index.php?current_page='+ url);
        }
    })
}

function logout_ajaxCall(){
    var login_status = "logout";
    $.ajax({
        url: "login_handler.php",
        data: login_status,
        cache: false,
        method: "POST",
        dataType: "json",
        success: function (response) {
            load_content("login");
        }
    })
}


