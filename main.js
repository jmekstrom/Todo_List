var taskinput = $("#taskInput").val();

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
            $(this).parent().siblings().addClass("crossout");
            complete(id,1);
        }
        else {
            $(this).parent().siblings().removeClass("crossout");
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
    console.log("to do item object",todo_item_object);
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
    })
    var $task_td = $("<td>", {
        class: "task_td",
        onclick: "showTask(" + todo_item_object.id + ")"
    }).text(todo_item_object.task);
    var $date_td = $("<td>", {
        class: "date_td",
        onclick: "showTask(" + todo_item_object.id + ")"
    }).text(todo_item_object.due_date);
    var $priority_td = $("<td>", {
        class: "priority_td",
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
    $($operation_td).append($editTask_btn,$deleteTask_btn).hide();
    $($checkbox_td).append($checkbox);
    $($tableRow).append($checkbox_td,$task_td,$date_td,$priority_td,$operation_td);
    $('tbody').append($tableRow);
    //var taskDOM = $($tableRow).append($checkbox_td,$task_td,$date_td,$priority_td,$deleteTask_td);
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
    $("#task").html("Task: " + todoObj.task);
    $("#status_p").html("Status:" + todoObj.complete);
    $("#date_p").html("Complete by: " + todoObj.due_date);
    $("#priority_p").html("Priority: " + todoObj.priority);
    $("#details_p").html("Extra Details: " + todoObj.details);
    $("#created_p").html("Created: " + todoObj.created_datetime);
    $("#id_p").html("Task Number: " + todoObj.id);
    $('#itemModal').modal('show');
}

function deleteTask(id) {
    console.log("delete clicked", id);
    $('tr[data-index=' + id + ']').remove();

}

function edit() {
    if (!$.isEmptyObject(todo_items)) {
        console.log("edit clicked");
        $(".operation_td").toggle('slide');
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
    update_dom_table();
}

function update_dom_table(){
    $(".operation_td").hide("slide");
    console.log('update dom Table pre-ajax');
    $.ajax({ //this page sends data to the login_handler.php page
        url: "data_handler_receive.php",
        method: "POST",
        cache: "false",
        data: {},
        dataType: 'json',
        success: function (response) {
            console.log("table from database",response);
            console.log(response.length);
            todo_items = {};
            for(var i = 0; i< response.length; i++){
                var id = response[i].id;
                todo_items[id] = response[i];
            }
            console.log("todo_items inside of update_dom_table: " , todo_items);
            $('tbody').empty();
            for(var j in todo_items){
                console.log("in loop",todo_items[j].date);
                create_task_dom(todo_items[j]);
            }
        }
    });

}

function complete(id,value) {
    for (var i in todo_items) {
        //update_table();
    }
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
