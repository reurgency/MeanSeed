'use strict';

// Declare module and inject dependencies
var taskModule = taskModule || angular.module('TaskApp.task', []);

/*************************************************************************
***
*** Deals with business logic for task
***
**************************************************************************/

taskModule.factory('TaskService',
    [

        /*************************************************************************
        ***
        *** Injectables
        ***
        *************************************************************************/

        '$rootScope',
        '$location',
        'TaskModel',
        'TaskResource',

function ($rootScope, $location, TaskModel,  TaskResource) {

            /*************************************************************************
            ***
            *** Application Event Handlers
            ***
            *************************************************************************/

            function tasksRequestedHandler(event) {
                getTasks();
            }
            $rootScope.$on("tasksRequested", taskRequestedHandler);

            function addTaskRequestedHandler(event) {
                $location.path('task/0');
            }
            $rootScope.$on("addTaskRequested", addTaskRequestedHandler);

            function updateTaskRequestedHandler(event, task) {
                var valid = true;
                var validationMessages = [];

                if (task.Name == "") {
                    valid = false;
                    validationMessages.push("You must have a Name for your task.");
                }

                if (valid) {
                    if(task._id){
                        TaskResource.update( {id: task._id}, task, saveTask_resultHandler );
                    }else{
                        TaskResource.save( task, saveTask_resultHandler );
                    }
                } else {
                    alert(validationMessages.join("\n"));
                }
            }
            $rootScope.$on("updateTaskRequested", updateTaskRequestedHandler);

            function removeTaskRequestedHandler(event, task) {

                TaskResource.delete({ id: task._id },
                    function(){
                        deleteTask_resultHandler(task);
                    }
                );
            }
            $rootScope.$on("removeTaskRequested", removeTaskRequestedHandler);

            function taskRequestedHandler(event, id) {
                TaskResource.get({ id: id }, getTask_resultHandler);
            }
            $rootScope.$on("taskRequested", taskRequestedHandler);



            /*************************************************************************
            ***
            *** Result Handlers
            ***
            **************************************************************************/

            function getTasks_resultHandler(results) {
                TaskModel.tasks = results;

                $rootScope.$emit("taskReceived", results);
            }

            function getTask_resultHandler(task) {
                $rootScope.$emit("taskReceived", task);
            }

            function saveTask_resultHandler(savedTask) {
                var task = re.getItemByProperty(TaskModel.tasks, "_id", savedTask._id);

                if( task ){
                    //Make sure that any property that got changed by the server
                    //gets applied here
                    for (var property in savedTask) {
                        task[property] = savedTask[property];
                    }
                }else{
                    //This is a new task, add it to the collection
                    TaskModel.tasks.push(savedTask);
                }

                $rootScope.$emit('taskUpdateComplete', task);
            }

            function deleteTask_resultHandler(task) {
                var oldTaskIndex = re.getIndexByProperty(TaskModel.tasks, "_id", task._id);
                TaskModel.tasks.splice(oldTaskIndex, 1);

                $location.path("/task");
            }

            /*************************************************************************
            ***
            *** Fault Handlers
            ***
            *************************************************************************/

            function faultHandler(fault) {
                alert("Fault");
            }

            /*************************************************************************
            ***
            *** Helper Methods
            ***
            *************************************************************************/

            function getTasks() {
                TaskResource.query(getTasks_resultHandler);
            }

            /*************************************************************************
            ***
            *** Code that runs on startup
            ***
            *************************************************************************/
            console.log("TaskService loaded");

            getTasks();
        }
    ]
);