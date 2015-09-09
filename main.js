var taskinput = $("#taskInput").val();
var editState = false;
var index_of_task_to_edit;

/*****************
 *
 * document ready
 * Functions called here: update_dom_table, checktaskInput, complete
 */
$(document).ready(function () {
    var content_container = $('.content_container');
    update_dom_table();
    taskinput = $("#taskInput").val();
    checktaskInput();
    content_container.on('keyup', '#addModal', function () {
        taskinput = $("#taskInput").val();
        checktaskInput();
    });

    content_container.on('click', '#loginBtn', function () {
        login_ajaxCall($('#username').val(), $('#password').val());
    });

    content_container.on('change', '.checkbox', function () {
        var id = $(this).parent().parent().attr("data-index");
        if ($(this).is(':checked')) {
            $(this).parent().parent().siblings().slideToggle();
            complete(id, 1);
        }
        else {
            complete(id, 0);
        }
    });

});

/*********************
 * Function Name: checktaskInput;
 * @purpose: check to see if anything has been entered into the input boxes,
 *           if so allow user to add information to dom/db;
 * @params: N/A;
 * @globals: taskinput;
 * @return: none;
 */
function checktaskInput() {
    if (taskinput === undefined || taskinput == '') {
        $('#addtaskBtn').prop('disabled', true);
    }
    else {
        $('#addtaskBtn').removeAttr('disabled');
    }
}

/*********************
 * Function Name: login_ajaxCall;
 * @purpose: Send data to login_handler.php file which then checks a database for the user;
 * @params: N/A;
 * @globals: N/A;
 * @return: N/A;
 */

function login_ajaxCall(username, password) {
    console.log("login before ajax");
    $.ajax({
        url: "data_handlers/login_handler.php",
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
                load_content('list_all_items');
                update_dom_table();
            }
        }
    });
}

/*********************
 * Function Name: load_content;
 * @purpose: Loads the specific page that is required for a given situation. See login_ajaxCall for eg;
 * @params: url;
 * @globals: N/A;
 * @return: N/A;
 */

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

/*********************
 * Function Name: logout_ajaxCall;
 * @purpose: ajax call for logout.php which destroys the session and logs the user out;
 * @params: N/A;
 * @globals: N/A;
 * @return: N/A;
 */

function logout_ajaxCall() {
    $.ajax({
        url: "data_handlers/logout.php",
        cache: false,
        method: "POST",
        dataType: "text",
        success: function (response) {
            load_content("login");
        }
    })
}

/*********************
 * Function Name: addTask();
 * @purpose: creates the task_object which is then used in all the things.
 *           It begins the "adding" action hence the name;
 * @params: N/A;
 * @globals: editState;
 * @return: N/A;
 */

function addTask() {
    $(".operation_td").hide("slide");
    editState = false;
    var task = $("#taskInput").val();
    var due_date = $("#datepickerAdd").val() + " " + $("#timepickerAdd").val();
    console.log(due_date);
    var priority = $("#priorityInput").val();
    var details = $("#detailsInput").val();
    var created_datetime = Date.now() / 1000;
    console.log(created_datetime);
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

/*********************
 * Function Name: create_task_dom();
 * @purpose: This function is responsible for creating dom nodes from a todo_item_object;
 * @params: todo_item_object;
 * @globals: N/A;
 * @return: N/A;
 */


function create_task_dom(todo_item_object) {

    if (todo_item_object.complete == 1) {
        var complete = true;
        var crossout = "crossout";

    }
    else {
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
        class: "task_td " + crossout,
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
        onclick: "editTask(" + todo_item_object.id + ")"
    }).append($('<span>', {
        class: 'glyphicon glyphicon-edit'
    }));
    var $deleteTask_btn = $("<button>", {
        type: "button",
        class: "nofocus btn btn-xs btn-danger deleteTaskBtn",
        onclick: "deleteTask(" + todo_item_object.id + ")"
    }).text('X');
    if (complete) {
        $deleteTask_btn.hide();
        $editTask_btn.hide();
        $tableRow.css("background-color", "lightgrey");
    }
    else {
        $deleteTask_btn.show();
        $editTask_btn.show();
    }
    $($operation_td).append($editTask_btn, $deleteTask_btn)
    $($checkbox_td).append($checkbox);
    $($tableRow).append($checkbox_td, $task_td, $date_td, $priority_td, $operation_td);
    $('#todo_tbody').append($tableRow);
    if (editState) {
        $(".operation_td").show();
    }
    else {
        $(".operation_td").hide();
    }
}

/*********************
 * Function Name: addClicked();
 * @purpose: This function is for clearing out the input fields so new information can be entered and showing the modal;
 * @params: N/A;
 * @globals: taskinput;
 * @return: N/A;
 */


function addClicked() {
    taskinput = '';
    checktaskInput();
    $('input').val('');
    $('select').val('');
    $('textarea').val('');
    $('#addModal').modal('show');
}

/*********************
 * Function Name: showTask();
 * @purpose: responsible for showing task details, its triggered when you click on any of the td's within the table;
 * @params: id;
 * @globals: N/A;
 * @return: activated only if the todoObj is undefined;
 */

function showTask(id) {
    for (var i in todo_items) {
        if (todo_items[i].id == id) {
            var todoObj = todo_items[i];
        }
    }
    if (todoObj === undefined) {
        console.log("something is wrong with me...");
        return;
    }
    if (todoObj.complete == 1) {
        var status = "Complete";
    }
    else {
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

/*********************
 * Function Name: deleteTask();
 * @purpose: responsible for deleting data out of the database, it does this through an ajax call to the data_handler_delete;
 * @params: id;
 * @globals: N/A;
 * @return: N/A;
 */

function deleteTask(id) {
    $.ajax({
        url: 'data_handlers/data_handler_delete.php',
        data: {
            obj_id: id
        },
        cache: false,
        method: "POST",
        dataType: "json",
        success: function (response) {
            if (response.success) {
                update_dom_table();
            }
            else {
                console.log("nothing in DB to delete")
            }
        }
    });


}

/*********************
 * Function Name: edit();
 * @purpose: checks to see if the operations part of the table should be visible or not, if so, displays the edit opperations;
 * @params: N/A;
 * @globals: N/A;
 * @return: N/A;
 */

function edit() {
    if (!$.isEmptyObject(todo_items)) {
        console.log("edit clicked");
        editState = !editState;
        if (editState) {
            $(".operation_td").show('slide');
        }
        else {
            $(".operation_td").hide('slide');
        }
    }
}

/*********************
 * Function Name: editTask();
 * @purpose: cycles through todo_items and gives us the ability to edit the task;
 * @params: id;
 * @globals: index_of_task_to_edit;
 * @return: N/A;
 */

function editTask(id) {
    $('#editModal').modal('show');
    for (var i in todo_items) {
        if (todo_items[i].id == id) {
            var task = todo_items[i];
            index_of_task_to_edit = i;
        }
        else {
            console.log("cannot find task by id");
        }
    }
    var splitdatetime = task.due_date.split(" ");
    var date = splitdatetime[0];
    var time = splitdatetime[1];
    $("#edittaskInput").val(task.task);
    $("#datepickerEdit").val(date);
    $("#timepickerEdit").val(time);
    $("#editpriorityInput").val(task.priority);
    $("#editdetailsInput").val(task.details);
}


/*********************
 * Function Name: submitChanges();
 * @purpose: cycles through todo_items and gives us the ability to edit the task;
 * @param: task;
 * @param: i;
 * @globals: N/A;
 * @return: N/A;
 */
function submitChanges(task, i) {
    todo_items[index_of_task_to_edit].task = $("#edittaskInput").val();
    todo_items[index_of_task_to_edit].due_date = $("#datepickerEdit").val() + " " + $("#timepickerEdit").val();
    todo_items[index_of_task_to_edit].priority = $("#editpriorityInput").val();
    todo_items[index_of_task_to_edit].details = $("#editdetailsInput").val();
    var task_object = todo_items[index_of_task_to_edit];
    $.ajax({
        url: 'data_handlers/data_handler_edit.php',
        method: "POST",
        cache: false,
        data: {
            task_data: task_object
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                console.log("database was edited", response);
                update_dom_table();
            }
            else {
                console.log("database was not updated", response);
            }
        }
    });
}

/*********************
 * Function Name: update_dom_table();
 * @purpose: update the dom with new information from the database. this interacts with most major functionality in the table;
 * @params: N/A;
 * @globals: todo_items;
 * @return: N/A;
 */

var todo_items = {};

function update_dom_table(username) {
    console.log('update dom Table pre-ajax');
    $.ajax({ //this page sends data to the login_handler.php page
        url: "data_handlers/data_handler_receive.php",
        method: "POST",
        cache: "false",
        data: {},
        dataType: 'json',
        success: function (response) {
            if (response.success && !$.isEmptyObject(response.data)) {
                todo_items = {};
                console.log(response.data);
                for (var i in response.data) {
                    var order = response.data[i];
                    todo_items[i] = order;
                }

                console.log("Data in order", todo_items);
                console.log("todo_items inside of update_dom_table: ", todo_items);

                $('#todo_tbody').empty();
                for (var j in todo_items) {
                    console.log("in loop", todo_items[j]);
                    create_task_dom(todo_items[j]);
                }
            }
            else {
                console.log("no more data in DB", response);
                todo_items = {};
                $('#todo_tbody').empty();
            }
        }
    });

}

/*********************
 * Function Name: complete();
 * @purpose: checks to see if a task is complete, and then ajax calls data_handler_complete;
 * @param: id;
 * @param: value;
 * @globals: todo_items;
 * @return: N/A;
 */

function complete(id, value) {
    for (var i in todo_items) {
        console.log(i, todo_items[i]);
        if (todo_items[i].id == id) {
            var task = i;
        }
    }
    todo_items[task].complete = value;
    var task_object = todo_items[task];
    //console.log("complete function", todo_items[id])
    $.ajax({
        url: 'data_handlers/data_handler_complete.php',
        method: "POST",
        cache: false,
        data: {
            task_data: task_object
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                update_dom_table();
            }
            else {
                console.log("database was not updated");
            }
        }
    });
}


/*********************
 * Function Name: add_item_db();
 * @purpose: adds task to the database;
 * @param: task_object;
 * @globals: N/A;
 * @return: N/A;
 */
function add_item_db(task_object) {
    console.log('add_item_db pre-ajax');
    console.log("task_object", task_object);
    $.ajax({
        url: 'data_handlers/data_handler_send.php',
        method: "POST",
        cache: false,
        data: {
            task_data: task_object
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            update_dom_table();
        }
    });
}


/*******************
 * Function Name: create_user();
 *
 */

function create_user() {
    console.log("create user pre-ajax");
    var username = $('#username_create').val();
    var password = $('#password_create').val();
    var email = $('#email_create').val();
    $.ajax({
        url: 'data_handler_user.php',
        method: "POST",
        cache: false,
        data: {
            username: username,
            password: password,
            email: email
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.success) {
                login_ajaxCall(username, password);
                $('#createmodal').modal('hide');
                $('.modal-backdrop').remove(); //Somewhat hacky but this works for removing that weird modal filter.
            }
        }
    })
}

