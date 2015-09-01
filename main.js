var taskinput = $("#taskInput").val();
$(document).ready(function () {
    taskinput = $("#taskInput").val();
    checktaskInput();
    $('#addModal').keyup(function () {
        taskinput = $("#taskInput").val();
        checktaskInput();
    })
})

function checktaskInput() {
    if (taskinput === undefined || taskinput == '') {
        $('#addtaskBtn').prop('disabled', true);
    }
    else {
        $('#addtaskBtn').removeAttr('disabled');
    }
}

function login_ajaxCall() {
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({ //this page sends data to the login_handler.php page
        url:"login_handler.php",
        method: "POST",
        cache: "false",
        data : {
            username: username,
            password: password
        },
        dataType: 'json',
        success: function(response){
            //print(json_encode($output)); FROM LOGIN.PHP
            console.log('the response is ',response);
            //$('body').html(response)
            if(response.success==true) {
                console.log('IT WORKED')
                load_content(response.destination);
            }
        }
    });
}

function load_content(url){
    console.log('bombs away');
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
    $.ajax({
        url: "logout.php",
        cache: false,
        method: "POST",
        dataType: "text",
        success: function (response) {
            console.log(response);
            load_content("login");
        }
    })
}

var todo_item_array=[];
var id = 0;
var modal_td_DOM = $("<td>",{
    "data-toggle": "modal",
    "data-target": "itemModal"
})

function addTask(){
    $(".delete_td").hide("slide");
    id++;
    var task     = $("#taskInput").val();
    var date     = $("#dateInput").val();
    var priority = $("#priorityInput").val();
    var details  = $("#detailsInput").val();
    var created_datetime = new Date().getTime();
    var complete = "incomplete";
   var $tableRow = $('<tr>',{
       'data-index': id
   })
    var $checkbox_td = $('<td>',{
        class: "checkbox_td"
    })
    var $checkbox = $('<input>',{
        type: "checkbox",
        class: "checkbox",
        value: "complete"
    })
    var $task_td = $("<td>", {
        class: "task_td",
        onclick: "showTask("+id+")"
    }).text(task);
    var $date_td = $("<td>", {
        class: "date_td",
        onclick: "showTask("+id+")"
    }).text(date);
    var $priority_td = $("<td>", {
        class: "priority_td",
        onclick: "showTask("+id+")"
    }).text(priority);
    var $deleteTask_td = $("<td>",{
        class: "delete_td"
    })
    var $deleteTask_btn = $("<button>",{
        display: "none",
        type: "button",
        class: "btn btn-xs btn-danger deleteTaskBtn",
        onclick: "deleteTask(" + id + ")"
    }).text('X');
    $($deleteTask_td).append($deleteTask_btn).hide();
    $($checkbox_td).append($checkbox);
    var taskDOM = $($tableRow).append($checkbox_td,$task_td,$date_td,$priority_td,$deleteTask_td);
    var todo_item = {
        id: id,
        complete: complete,
        task: task,
        date: date,
        priority: priority,
        details: details,
        created_datetime: created_datetime,
        DOM: taskDOM
    }
    todo_item_array.push(todo_item);
    $('.tableBottom').before($tableRow);

}

function addClicked(){
    taskinput = '';
    checktaskInput();
    $('input').val('');
    $('select').val('');
    $('textarea').val('');
    $('#addModal').modal('show');
}

function showTask(id){
    for(var i in todo_item_array){
        if(todo_item_array[i].id == id){
            var todoObj = todo_item_array[i];
        }
    }
    if(todoObj === undefined) {
        console.log("something is wrong with me...");
        return;
    }
    $("#task").html("Task: "+todoObj.task);
    $("#status_p").html("Status:" + todoObj.complete);
    $("#date_p").html("Complete by: " + todoObj.date);
    $("#priority_p").html("Priority: " + todoObj.priority);
    $("#details_p").html("Extra Details: " + todoObj.details);
    $("#created_p").html("Created: " + todoObj.created_datetime);
    $("#id_p").html("Task Number: " + todoObj.id);
    $('#itemModal').modal('show');
}

function deleteTask(id){
    console.log("delete clicked",id);
    $('tr[data-index='+id+']').remove();
    for(var i in todo_item_array){
        if(todo_item_array[i].id === id){
            console.log("before splice:",todo_item_array)
            todo_item_array.splice(i,1);
            console.log("after splice:",todo_item_array);
        }
    }
}

function edit(){
    if(todo_item_array.length > 0) {
        console.log("edit clicked");
        $(".delete_td").toggle('slide');
    }
}
