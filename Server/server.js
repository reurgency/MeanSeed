
/**
 * Module dependencies.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var fs = require('fs');
var config = require("./config/config");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('Client'));

var db = mongoose.connect(config.db);

//Bootstrap models
var models = require("./config/models");
models.configure(app, __dirname);

//Wire up the api
var routes = require("./config/routes");
routes.register(app, models.models);

require("./config/passport")(passport);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(
  function(req, res, next) {
    res.set('X-Powered-By', 'reUrgency');
    next();
  }
);

http.createServer(app).listen(
  app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  }
);
