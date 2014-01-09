/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/9/14
 * Time: 2:00 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

var taskModule = taskModule || angular.module('TaskApp.task', []);

/* ---- Routes ---- */

taskModule.config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {

        $routeProvider.when(
            '/task',
                {
                    templateUrl: '/TaskApp/Tasks/TaskList.tpl.html',
                    controller: 'TaskListVMController'
                }
        );

    }])

    .controller(
        'TaskListVMController',
        [

        /*************************************************************************
         ***
         *** Injectables
         ***
         *************************************************************************/

            '$scope',
            '$rootScope',
            '$location',
            'sharedData',
            'TaskModel',

            function ($scope, $rootScope, $location, sharedData, TaskModel) {

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

                $scope.TaskModel = TaskModel;

                /*************************************************************************
                 ***
                 *** UI Event Handlers
                 ***
                 *************************************************************************/

                /*************************************************************************
                 ***
                 *** Application Event Handlers
                 ***
                 *************************************************************************/

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

                /*************************************************************************
                 ***
                 *** Code to run when the controller loads
                 ***
                 *************************************************************************/

            }
        ]
    );
