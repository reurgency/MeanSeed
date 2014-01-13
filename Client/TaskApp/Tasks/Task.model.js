/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/9/14
 * Time: 1:55 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

// Declare module and inject dependencies
var taskModule = taskModule || angular.module('TaskApp.task', []);

taskModule.factory('TaskModel',
    [
        function () {
            return {

                /*************************************************************************
                 ***
                 *** Constants
                 ***
                 *************************************************************************/

                /*************************************************************************
                 ***
                 *** Model Property Initialization
                 ***
                 *************************************************************************/

                tasks: [],
                selectedTask: null
            }
        }
    ]
);