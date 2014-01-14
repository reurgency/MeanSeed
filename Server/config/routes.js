/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/13/14
 * Time: 7:26 AM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

exports.register = function(app, models){

    //Set up an instance of restify that works with express
    var restify = require('express-restify-mongoose');

    //Add restify options.  These are actually defaults but I wanted it to be obvious that these are configurable
    var restifyOptions = {
        prefix: '/api',
        version: '/v1',
        private: false,
        lean: true,
        plural: true,
        middleware: [],
        strict: false,
        findOneAndUpdate: true
    };

    restify.defaults(restifyOptions);

    //Configure our default rest services using our collection of data models
    app.configure(
        function(){
            for( var index = 0; index < models.length; index++ ){
                var model = models[index];
                restify.serve(app, model);
            }
        }
    );

    //Apply any custom services here
    //var TaskApi = require("../Tasks/Task.api");
    //app.get('/api/tasks', TaskApi.list);
}


