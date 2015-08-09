'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    inline: {
      dev: {
        options: {
          cssmin: false,
          uglify: false
        },
        src: 'src/index.html',
        dest: 'dist/index.html'
      },
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
    },

    watch: {
      app: {
        files: ['src/index.html', 'src/scripts/main.js', 'src/styles/main.scss'],
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
      },
      CNAME: {
        expand: true,
        flatten: true,
        src:  ['src/CNAME'],
        dest: 'dist/'
      }
    },

    sass: {
      dist: {
        files: {
          'src/styles/main.css': 'src/styles/main.scss'
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'dist',
        branch: 'gh-pages',
        repo: 'https://github.com/initiummedia/legco_web2.git'
      },
      src: '**/*'
    },

    rsync: {
      options: {
        args: ["--verbose"],
        exclude: [".git*","*.scss","node_modules"],
        recursive: true
      },
      showcase: {
        options: {
          src: "./dist/",
          dest: "/home/vagrant/web/legco_web2",
          host: "showcase",
          delete: true // Careful this option could cause data loss, read the docs!
        }
      }
    },

    execute: {
      opencc: {
        src: ['utils/s2t.js']
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
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-execute');


  grunt.registerTask('build', ['sass', 'clean', 'inline:dev', 'copy']);
  grunt.registerTask('serve', ['connect:dist', 'watch']);
  grunt.registerTask('deploy', ['sass', 'clean', 'inline:dist', 'copy', 'targethtml:prod', 'htmlmin', 'execute',
                                'gh-pages', 'rsync']);

};