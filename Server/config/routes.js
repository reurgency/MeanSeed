/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/13/14
 * Time: 7:26 AM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

exports.register = function(app){
    var API_PATH = "/api";

    var user = require('../Users/User.api');
    var task = require('../Tasks/Task.api');

    //app.get('/', routes.index);
    app.get(API_PATH + '/users', user.list);

    app.get(API_PATH + '/tasks', task.list);
    app.get(API_PATH + '/tasks/:TaskId', task.get);
    app.post(API_PATH + '/tasks', task.save);
}


