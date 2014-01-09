/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/8/14
 * Time: 8:53 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');

exports.list = function(request, response){
    var result = [];
    result.push(
        { Name: "Task 1", Description: "Task Number 1",  TaskId: 1 }
    );

    result.push(
        { Name: "Task 2", Description: "Task Number 2",  TaskId: 2 }
    );

    var Task = mongoose.model("Task");
    Task.find({},
        function(error, data){
            var tasks = data;
        }
    )

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(result));
};

exports.get = function(request, response){
    var TaskId = request.params.TaskId;

    console.log("Attempting to get task: " + TaskId );
    var result = { Name: "Task 1", Description: "Task Number 1",  TaskId: 1 };

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(result));
}

exports.save = function(request, response){
    var Task = mongoose.model("Task");

    var data = request.body;
    data.TaskId = null;
    var task = new Task(data);
    task.save(
        function(error){
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(task));
        }
    )
}