﻿'use strict';

// Declare module and inject dependencies
var taskModule = taskModule || angular.module('TaskApp.task', []);

/*************************************************************************
***
*** Deals with business logic for task
***
**************************************************************************/

taskModule.factory('TaskController',
    [

        /*************************************************************************
        ***
        *** Injectables
        ***
        *************************************************************************/

        '$rootScope',
        '$location',
        'TaskModel',
        'TaskService',

function ($rootScope, $location, TaskModel,  TaskService) {

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
                    TaskService.save(task,
                        function (savedTask) {
                            var task = re.getItemByProperty(TaskModel.task, "TaskId", savedTask.TaskId);

                            for (var property in savedTask) {
                                task[property] = savedTask[property];
                            }

                            task.unit = UnitService.units[task.UnitId];
                            $rootScope.$apply();
                            $rootScope.$emit('taskUpdateComplete', task);
                        }
                    );
                } else {
                    alert(validationMessages.join("\n"));
                }
            }
            $rootScope.$on("updateTaskRequested", updateTaskRequestedHandler);

            function removeTaskRequestedHandler(event, task) {
                
                TaskService.delete(task.TaskId,
                    function () {
                        var oldTaskIndex = re.getIndexByProperty(TaskModel.task, "TaskId", task.TaskId);
                        TaskModel.task.splice(oldTaskIndex, 1);

                        $location.path("/task");
                        $rootScope.$apply();
                    }
                );
            }
            $rootScope.$on("removeTaskRequested", removeTaskRequestedHandler);

            function taskRequestedHandler(event, id) {
                TaskService.get({ id: id }, getTask_resultHandler);
            }
            $rootScope.$on("taskRequested", taskRequestedHandler);



            /*************************************************************************
            ***
            *** Result Handlers
            ***
            **************************************************************************/

            function getTasks_resultHandler(results) {
                TaskModel.task = results;

                $rootScope.$emit("taskReceived", results);
            }

            function getTask_resultHandler(task) {
                $rootScope.$emit("taskReceived", task);
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
                TaskService.query(getTasks_resultHandler);
            }

            /*************************************************************************
            ***
            *** Code that runs on startup
            ***
            *************************************************************************/
            console.log("taskController loaded");

            getTasks();
        }
    ]
);