var taskTemplate = function(todo){
    var t = todo
    var taskLine = `
        <div class="tong-task-line" data-id="${t.id}">
            <span class="tong-task-text">${t.task}</span>
            <a class="tong-task-delete tong-little-button tong-right" data-id="${t.id}" href="#">delete</a>
            <a class="tong-task-edit tong-little-button tong-right" data-id="${t.id}" href="#">edit</a>
        </div>
       `
    return taskLine
}

var addInput = `
    <div class="tong-task-input">
        <input id="id-input-task" type="text" placeholder="Add Todo" name="task">
        <input id="id-button-task-add" class="tong-little-button"
               type="submit" value="Submit">
    </div>
`


var editInput =  `
        <div class="tong-edit-update">
            <input class="tong-edit-input" name="new-task">
            <a class="tong-task-update tong-little-button" href='#'>update</a>
        </div>
      `
var bindEventTaskAdd = function() {
    $('.tong-task-add').on('click', function() {
        button = $(this)
        $('.tong-task-input').remove()
        button.parent().prepend(addInput)
    })
}

var bindEventTaskSubmit = function(){
    $('.tong-button').on('click', '#id-button-task-add', function(){
        var task = $('#id-input-task').val()
        var form = {
            task: task,
        }
        var response = function(r){
            if(r.success) {
                var td = r.data
                $('.tong-task-block').append(taskTemplate(td))
                $('.tong-task-input').remove()
            } else {
                alert(r.message)
            }
        }
        api.taskAdd(form, response)
    })
}


var bindEventTaskDelete = function() {
    $('.tong-task-block').on('click', '.tong-task-delete', function(){
        var taskId = $(this).data('id')
        var taskLine = $(this).closest('.tong-task-line')
        var response = function(r){
            if(r.success) {
                var td = r.data
                taskLine.remove()
            }
        }
        api.taskDelete(taskId, response)
    })
}


var bindEventTaskEdit = function() {
    $('.tong-task-block').on('click', '.tong-task-edit', function() {
        var taskLine = $(this).closest('.tong-task-line')
        $('.tong-edit-update').remove()
        taskLine.append(editInput)
    })
}


var bindEventTaskUpdate = function() {
    $('.tong-task-block').on('click', '.tong-task-update', function() {
        var taskLine = $(this).closest('.tong-task-line')
        var newTask = taskLine.find('.tong-edit-input').val()
        var taskId = $(this).closest('.tong-task-line').data('id')
        var form = {
            task: newTask
        }
        var response = function(r){
            if(r.success) {
                var td = r.data
                taskLine.find('.tong-task-text').text(newTask)
                taskLine.find('.tong-edit-update').remove()
            } else {
                alert(r.message)
            }
        }
        api.taskUpdate(taskId, form, response)
    })
}


var bindEvents = function() {
    bindEventTaskAdd()
    bindEventTaskSubmit()
    bindEventTaskDelete()
    bindEventTaskEdit()
    bindEventTaskUpdate()
}

$(document).ready(function() {
    bindEvents()
})

