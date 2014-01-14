/**
 * Created with JetBrains WebStorm.
 * User: Joseph
 * Date: 1/9/14
 * Time: 8:16 AM
 * To change this template use File | Settings | File Templates.
 */
var path = require('path'),
    util = require('util');

var _ = require('lodash'),
    coffeeify = require('coffeeify'),
    hbsfy = require('hbsfy'),
    ngmin = require('ngmin'),
    rfileify = require('rfileify'),
    uglify = require('uglify-js'),
    wrench = require('wrench');

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
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib');

    // Default task(s).
    //grunt.registerTask('default', ['concat', 'useminPrepare', 'usemin']);

    grunt.registerTask('build',
        [
            'useminPrepare',
            'concat',
            'uglify',
            'copy',
            'usemin'
        ]
    );

};