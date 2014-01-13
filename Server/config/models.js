/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/13/14
 * Time: 8:33 AM
 * To change this template use File | Settings | File Templates.
 */
//require('./Users/User');
//require('./Tasks/Task.model');

exports.configure = function(){

    function walk(dir) {
        var fs = require("fs");
        fs.readdirSync(dir).forEach(
            function(file) {
                var newPath = dir + '\\' + file;
                var stat = fs.statSync(newPath);
                if (stat.isFile()) {
                    if (/(.*)\.(model.js$)/.test(file)) {
                        require(newPath);
                    }
                } else if (stat.isDirectory()) {
                    walk(newPath);
                }
            }
        );
    };

    walk(__dirname + "\\..\\");
}


