'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env: {
      options: {
        dev: {
          NODE_ENV: "DEVELOPMENT"
        },
        prod: {
          node_ENV: 'PRODUCTION'
        }
      }
    },

    clean: ['dist'],

    inline: {
      dist: {
        options: {
          cssmin: true,
          uglify: true
        },
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      },

      dist_removeComments: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },

    watch: {
      app: {
        files: ['src/**/*'],
        options: {
          livereload: true
        },
        tasks: ["build"]
      }
    },

    connect: {
      dist: {
        options: {
          port: 9000,
          base: 'dist/'
        }
      }
    },

    targethtml: {

      // Remove livereload and its friends
      prod: {
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },

    copy: {
      main: {
        expand: true,
        flatten: true,
        src:  ['src/images/*'],
        dest: 'dist/images/'
      }
    },

    sass: {
      dist: {
        files: {
          'app/styles/main.css': 'src/styles/main.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-targethtml');

  grunt.registerTask('build', ['sass', 'clean', 'inline', 'copy']);
  grunt.registerTask('serve', ['connect:dist', 'watch']);
  grunt.registerTask('produce', ['build', 'targethtml:prod', 'htmlmin']);

};