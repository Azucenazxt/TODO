api = {}

api.ajax = function(url, method, form, callback){
    var request = {
        url: url,
        type: method,
        data: form,
        success: function(response){
            var r = JSON.parse(response)
            callback(r)
        },
        error: function(err){
            var r = {
                'success': false,
                message: '网络错误'
            }
            callback(r)
        }
    }
    console.log('r', request, request['data'])
    $.ajax(request)
}


api.post = function(url, form, response){
    api.ajax(url, 'post', form, response)
}

api.get = function(url, response){
    api.ajax(url, 'get', {}, response)
}

api.taskAdd = function(form, response){
    var url = 'api/add'
    api.post(url, form, response)
}

api.taskDelete = function(taskId, response){
    var url = 'api/delete/' + taskId
    api.get(url, response)
}

api.taskUpdate = function(taskId, form, response){
    var url = 'api/edit/' + taskId
    api.post(url, form, response)
}