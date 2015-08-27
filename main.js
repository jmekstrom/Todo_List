
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

var todo_item_array;
var id = 0;
var modal_td_DOM = $("<td>",{
    "data-toggle": "modal",
    "data-target": "itemModal"
})
var checkbox = $("<input>",{
    type: "checkbox"
})
function addTask(){
    id++;
    var task     = $("#taskInput").val();
    var date     = $("#dateInput").val();
    var priority = $("#priorityInput").val();
    var details  = $("#detailsInput").val();
    var timeStamp = new Date().getTime();
    var todo_item = {id:id,task:task,date:date,priority:priority,details:details,timeStamp:timeStamp}
    //todo_item_array.push(todo_item);
    $(".tableBottom").before("<tr id='"+id+"'><td><input type='checkbox'></td>"+modal_td_DOM+"</tr>");

}

