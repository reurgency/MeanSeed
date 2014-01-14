'use strict';

var taskModule = taskModule || angular.module('TaskApp.task', []);

/* ---- Routes ---- */

taskModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/task/:id', {
        templateUrl: '/TaskApp/Tasks/Task.tpl.html',
        controller: 'TaskController'
    });
}])

.controller(
    'TaskController',
    [
        /*************************************************************************
        ***
        *** Injectables
        ***
        *************************************************************************/

        '$scope',
        '$rootScope',
        '$location',
        '$routeParams',
        'sharedData',
        'TaskModel',

        function ($scope, $rootScope, $location, $routeParams, sharedData, TaskModel) {

            /*************************************************************************
            ***
            *** Inheritence
            ***
            *************************************************************************/

            $scope = re.ViewModelBase($scope, $rootScope);

            /*************************************************************************
            ***
            *** Initialize scope
            ***
            *************************************************************************/

            var task = {};

            $scope.name = "";
            $scope.description = "";

            $scope.TaskModel = TaskModel;


            /*************************************************************************
            ***
            *** UI Event Handlers
            ***
            *************************************************************************/

            function save() {
                task.Name = $scope.name;
                task.Description = $scope.description;

                $rootScope.$emit('updateTaskRequested', task);
            }
            $scope.save = save;


            function remove() {
                $rootScope.$emit('removeTaskRequested', task);
            }
            $scope.delete = remove;


            /*************************************************************************
            ***
            *** Application Event Handlers
            ***
            *************************************************************************/

            function taskReceivedHandler(event, result) {
                task = result;

                $scope.name = result.Name;
                $scope.description = result.Description;
            }
            $scope.$addEventListener("taskReceived", taskReceivedHandler);


            function taskUpdateCompleteHandler(event, task) {
                $location.path("/task");
            }

            /*************************************************************************
            ***
            *** Result Handlers
            ***
            *************************************************************************/
            
            /*************************************************************************
            ***
            *** Helper Functions
            ***
            *************************************************************************/
            
            function getTask(id) {
                $rootScope.$emit("taskRequested", id);
            }
                
            /*************************************************************************
            ***
            *** Code to run when the controller loads
            ***
            *************************************************************************/

            sharedData.showBackButton = true;
            sharedData.mode = "task";
            sharedData.backPath = "";

            var taskId = $routeParams.id;
            if( taskId && taskId != "0" ){
                getTask(taskId);
            }else{
                //task.TaskId = 0;
                task.Name = "";
                task.Description = "";
            }

        }
    ]
);