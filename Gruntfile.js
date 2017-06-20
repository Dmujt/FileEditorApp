(function () {
    'use strict';
}());

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ' '
            },
            dist: {
                src: [
                    'app/js/lib/jquery-3.2.1.js',
                    'app/js/lib/*.min.js',
                    'app/js/modules/*.js'
                ],
                dest: 'app/js/main.js'
            }
        },

        uglify: {
            options: {
                banner: '/***********!\n <%= pkg.name %>\n <%= grunt.template.today("dd-mm-yyyy") %>\n */\n\n'
            },
            dist: {
                files: {
                    'app/js/main.min.js': ['app/js/main.js']
                }
            }
        },

        jshint: {
            files: ['app/js/modules/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: ['app/stylesheets/scss'],
                    specify: 'app/stylesheets/scss/main.scss',
                    cssDir: 'app/stylesheets/css',
                    environment: 'development',
                    outputStyle: 'compressed'
                }
            }
        },

        watch: {
            files: ['<%= jshint.files %>', 'app/stylesheets/scss/**/*.scss'],
            tasks: ['concat', 'uglify', 'jshint', 'compass']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'compass']);
};
