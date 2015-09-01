<table class="table table-hover">
    <thead>
    <tr>
        <th class="checkbox_th">✓</th>
        <th>Task
            <button class="addBtn btn btn-xs btn-success" type="button" onclick="addClicked()">+</button>
            <button class="editBtn btn btn-xs btn-warning" type="button" onclick="edit()" >Edit</button>
        </th>
        <th>Date</th>
        <th>Priority</th>
        <th style="display: none" class="delete_td"></th>
    </tr>
    </thead>
    <tbody>
    <tr class="tableBottom">
        <td></td>
        <td></td>
        <td></td>
    </tr>
    </tbody>
</table>
<button id="update_list">Update List from db</button>
<!-- Modal -->
<div id="addModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add New Task</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Task" id="taskInput">
                </div>

                <div class="input-group form-group date">
                    <input type="text" class="form-control" placeholder="Date & Time" id="dateInput">
                    <div class="input-group-addon"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></div>
                </div>
                <script type="text/javascript">
                    $(function () {
                        $('#dateInput').datetimepicker({
                            orientation: "left bottom",
                            format: 'm/d/yy H:iip'
                        });

                    });
                </script>

                <div class="form-group">
                    <select class="form-control" id="priorityInput">
                        <option></option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                <div class="form-group">
                    <textarea class="form-control" rows="5" id="detailsInput" placeholder="Extra details..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id='addtaskBtn' class="btn btn-success" data-dismiss="modal" onclick="addTask()">Add</button>
            </div>
        </div>

    </div>
</div>

<!-- Modal -->
<div id="itemModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Task Details</h4>
            </div>
            <div class="modal-body">
                <h3 id="task"></h3>
                <p id="status_p"></p>
                <p id="date_p"></p>
                <p id="priority_p"></p>
                <p id="created_p"></p>
                <p id="id_p"></p>
                <p id="details_p"></p>
            </div>
            <div class="modal-footer">

            </div>
        </div>

    </div>
</div>