/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/13/14
 * Time: 8:33 AM
 * To change this template use File | Settings | File Templates.
 */

exports.models = [];

exports.configure = function(app, serverPath){
    exports.models = [];

    //Function used to walk the directories in search of models to initialize
    function searchForModels(dir) {
        var fs = require("fs");
        fs.readdirSync(dir).forEach(
            function(file) {
                var newPath = dir + '/' + file;
                var stat = fs.statSync(newPath);
                if (stat.isFile()) {
                    if (/(.*)\.(model.js$)/.test(file)) {
                        var model = require(newPath);
                        if( model.Model ){
                            exports.models.push(model.Model);
                        }
                    }
                } else if (stat.isDirectory()) {
                    //Traverse for additional models recursively
                    searchForModels(newPath);
                }
            }
        );
    };

    //Walk the server directory to get all models
    searchForModels(serverPath);



}


