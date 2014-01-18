/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/9/14
 * Time: 8:16 AM
 * To change this template use File | Settings | File Templates.
 */
var path = require('path'),
  util = require('util');

var _ = require('lodash')

var project = require('./project');

module.exports = function(grunt) {

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
          { src: '<%= project.path.client %>/TaskApp/index.html', dest: '<%= project.path.client %>/dist/index.html'}
        ]
      }
    },

    ngmin: {
      controllers: {
        src: ['Client/TaskApp/Tasks/Task.ctrl.js'],
        dest: 'Client/dist/Task.ctrl.js'
      },
      directives: {
        expand: true,
        cwd: 'test/src',
        src: ['directives/**/*.js'],
        dest: 'test/generated'
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

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');



  // Default task(s).
  grunt.registerTask('default',
    [
      //'ngmin',
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