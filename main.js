var taskinput = $("#taskInput").val();
var editState = false;

$(document).ready(function () {
    update_dom_table();
    $('.content_container').on('click', '#update_list', function () {
        update_dom_table();
    });
    taskinput = $("#taskInput").val();
    checktaskInput();
    $('#addModal').keyup(function () {
        taskinput = $("#taskInput").val();
        checktaskInput();
    });
    $('tbody').on('change', '.checkbox', function () {
        var id = $(this).parent().parent().attr("data-index");
        if ($(this).is(':checked')) {
            $(this).parent().parent().siblings().slideToggle();
            complete(id,1);
        }
        else {
            complete(id,0);
        }
    });
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
    console.log("login before ajax");
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({ //this page sends data to the login_handler.php page
        url: "login_handler.php",
        method: "POST",
        cache: "false",
        data: {
            username: username,
            password: password
        },
        dataType: 'json',
        success: function (response) {
            console.log('the response is ', response);
            if (response.success) {
                console.log('IT WORKED')
                load_content('list_all_items');
                update_dom_table();
            }
        }
    });
}

function load_content(url) {
    console.log("loading: " + url + ".php");
    $.ajax({
        url: "pages/" + url + ".php",
        data: {},
        dataType: 'html',
        success: function (response) {
            $(".content_container").html(response);
            window.history.pushState('test', 'test', 'index.php?current_page=' + url);
        }
    })
}

function logout_ajaxCall() {
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

function addTask() {
    $(".operation_td").hide("slide");
    editState = false;
    var task     = $("#taskInput").val();
    var due_date     = $("#dateInput").val();
    var priority = $("#priorityInput").val();
    var details = $("#detailsInput").val();
    var created_datetime = new Date().getTime();
    var complete = 0;
    var todo_item = {
        complete: complete,
        task: task,
        due_date: due_date,
        priority: priority,
        details: details,
        created_datetime: created_datetime,
    }
    add_item_db(todo_item);

}

function create_task_dom(todo_item_object){
    //console.log("to do item object",todo_item_object);
    if(todo_item_object.complete == 1){
        var complete = true;
        var crossout = "crossout";
    }
    else{
        var complete = false;
        var crossout = "";
    }
    var $tableRow = $('<tr>', {
        'data-index': todo_item_object.id
    });
    var $checkbox_td = $('<td>', {
        class: "checkbox_td"
    })
    var $checkbox = $('<input>', {
        type: "checkbox",
        class: "checkbox glyphicon glyphicon-unchecked",
        value: todo_item_object.complete
    }).prop('checked', complete);

    var $task_td = $("<td>", {
        class: "task_td "+crossout,
        onclick: "showTask(" + todo_item_object.id + ")"
    }).text(todo_item_object.task);
    var $date_td = $("<td>", {
        class: "date_td " + crossout,
        onclick: "showTask(" + todo_item_object.id + ")"
    }).text(todo_item_object.due_date);
    var $priority_td = $("<td>", {
        class: "priority_td " + crossout,
        onclick: "showTask(" + todo_item_object.id + ")"
    }).text(todo_item_object.priority);
    var $operation_td = $("<td>", {
        class: "operation_td"
    })
    var $editTask_btn = $("<button>", {
        type: "button",
        class: "nofocus btn btn-xs btn-warning editTaskBtn",
        onclick: "editTask("+todo_item_object.id+")"
    }).append($('<span>',{
        class: 'glyphicon glyphicon-edit'
    }));
    var $deleteTask_btn = $("<button>", {
        type: "button",
        class: "nofocus btn btn-xs btn-danger deleteTaskBtn",
        onclick: "deleteTask(" + todo_item_object.id + ")"
    }).text('X');
    if(complete){
        $deleteTask_btn.hide();
        $editTask_btn.hide();
        $tableRow.css("background-color","lightgrey");
    }
    else{
        $deleteTask_btn.show();
        $editTask_btn.show();
    }
    $($operation_td).append($editTask_btn,$deleteTask_btn)
    $($checkbox_td).append($checkbox);
    $($tableRow).append($checkbox_td,$task_td,$date_td,$priority_td,$operation_td);
    $('tbody').append($tableRow);
    if(editState) {
        $(".operation_td").show();
    }
    else{
        $(".operation_td").hide();
    }
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
    for(var i in todo_items){
        if(todo_items[i].id == id){
            var todoObj = todo_items[i];
        }
    }
    if (todoObj === undefined) {
        console.log("something is wrong with me...");
        return;
    }
    if(todoObj.complete == 1){
        var status = "Complete";
    }
    else{
        var status = "Incomplete";
    }
    $("#task").html("Task: " + todoObj.task);
    $("#status_p").html("Status: " + status);
    $("#date_p").html("Complete by: " + todoObj.due_date);
    $("#priority_p").html("Priority: " + todoObj.priority);
    $("#details_p").html("Extra Details: " + todoObj.details);
    $("#created_p").html("Created: " + todoObj.created_datetime);
    $("#id_p").html("Task Number: " + todoObj.id);
    $('#itemModal').modal('show');
}

function deleteTask(id) {
    console.log("delete clicked", id);
    $.ajax({
        url:'data_handler_delete.php',
        data:{
            obj_id: id
        },
        cache: false,
        method: "POST",
        dataType: "json",
        success: function (response) {
            console.log("response", response);
            if(response.success){
                update_dom_table();
            }
            else{
                console.log("nothing in DB to delete")
            }
        }
    });


}

function edit() {
    if (!$.isEmptyObject(todo_items)) {
        console.log("edit clicked");
        editState = !editState;
        if(editState) {
            $(".operation_td").show('slide');
        }
        else{
            $(".operation_td").hide('slide');
        }
    }
}

function editTask(id){
    $('#editModal').modal('show');
    for(var i in todo_items){
        if(todo_items[i].id == id){
            var task = todo_items[i];
            index_of_task_to_edit = i;
        }
        else{
            console.log("cannot find task by id");
        }
    }
    $("#edittaskInput").val(task.task);
    $("#editdateInput").val(task.due_date);
    $("#editpriorityInput").val(task.priority);
    $("#editdetailsInput").val(task.details);
}

function submitChanges(task,i){
    todo_items[index_of_task_to_edit].task = $("#edittaskInput").val();
    todo_items[index_of_task_to_edit].due_date = $("#editdateInput").val();
    todo_items[index_of_task_to_edit].priority = $("#editpriorityInput").val();
    todo_items[index_of_task_to_edit].details = $("#editdetailsInput").val();
    var task_object = todo_items[index_of_task_to_edit];
    $.ajax({
        url: 'data_handler_edit.php',
        method: "POST",
        cache: false,
        data: {
            task_data: task_object
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                console.log("database was edited",response);
                update_dom_table();
            }
            else {
                console.log("database was not updated",response);
            }
        }
    });
}

var todo_items = {};
function update_dom_table(){
    //console.log('update dom Table pre-ajax');
    $.ajax({ //this page sends data to the login_handler.php page
        url: "data_handler_receive.php",
        method: "POST",
        cache: "false",
        data: {},
        dataType: 'json',
        success: function (response) {
            if(response.success && !$.isEmptyObject(response.data)) {
                todo_items = {};
                console.log(response.data);
                for (var i in response.data) {
                    var order = response.data[i];
                    todo_items[i] = order;
                }
                console.log("Data in order", todo_items);
                console.log("todo_items inside of update_dom_table: ", todo_items);
                $('tbody').empty();
                for (var j in todo_items) {
                    console.log("in loop", todo_items[j]);
                    create_task_dom(todo_items[j]);
                }
            }
            else{
                console.log("no more data in DB",response);
                todo_items = {};
                $('tbody').empty();
            }
        }
    });

}

function complete(id,value) {
    for(var i in todo_items){
        console.log(i,todo_items[i]);
        if(todo_items[i].id == id){
            var task = i;
        }
    }
    todo_items[task].complete = value;
    var task_object = todo_items[task];
    //console.log("complete function", todo_items[id])
    $.ajax({
        url: 'data_handler_complete.php',
        method: "POST",
        cache: false,
        data: {
            task_data: task_object
        },
        dataType: 'json',
        success: function (response) {
            if(response.success){
                update_dom_table();
            }
            else{
                console.log("database was not updated");
            }
        }
    });
}

function add_item_db(task_object){
    console.log('add_item_db pre-ajax');
    $.ajax({
       url: 'data_handler_send.php',
        method: "POST",
        cache: false,
        data: {
          task_data: task_object
        },
        dataType: 'json',
        success: function(response){
            console.log(response);
            update_dom_table();
        }
    });
}
