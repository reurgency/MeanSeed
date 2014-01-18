/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/9/14
 * Time: 8:16 AM
 * To change this template use File | Settings | File Templates.
 */
var path = require('path'),
    util = require('util'),
    project = require('./project'),
    _ = require('lodash');


module.exports = function(grunt) {

  // load all grunt- dependencies from package.json
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: grunt.file.readJSON('project.json'),
    usemin: {  // grunt-usemin
      options: {
        dirs: ['<%= project.path %>']
      },
      html: ['<%= project.path.client %>/dist/*.html'],
      css: ['<%= project.path.client %>/dist/css/{,*/}*.css']
    },


    useminPrepare: {  // grunt-usemin
      options: {
        dest: '<%= project.path.client %>',
        root: '<%= project.path.client %>'
      },
      html: '<%= project.path.client %>/TaskApp/*.html'
    },

    copy: {
      main: {
        files: [
          { src:  '<%= project.path.client %>/TaskApp/index.html',
            dest: '<%= project.path.client %>/dist/index.html'}
        ]
      }
    },


    html2js: {
      options: {
        base: "Client",
        module: "TaskApp.Templates",
        rename: function(moduleName){
          return "/" + moduleName;
        }
      },
      main: {
        src: ['<%= project.path.client %>/**/*.tpl.html'],
        dest: '<%= project.path.client %>/TaskApp/Templates.js'
      }
    }
  });



  // Default task(s).
  grunt.registerTask('default',
    [
      'html2js',
      'useminPrepare',
      'concat',
      'uglify',
      'cssmin',
      'copy',
      'usemin'
    ]
  );

};