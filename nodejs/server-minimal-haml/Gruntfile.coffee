'use strict'

module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON __dirname + '/package.json'

    watch:
      haml:
        files: '<%= pkg.config.app %>/**/*.haml'
        tasks: ['haml:server']

    connect:
      server:
        options:
          hostname: 'localhost'
          port: '<%= pkg.config.server.port %>'
          base: '<%= pkg.config.server.base %>'

    haml:
      server:
        files: [
          expand: true
          cwd: '<%= pkg.config.app %>'
          src: ['**/*.haml']
          dest: '<%= pkg.config.server.base %>'
          ext: '.html'
        ]

  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-haml'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'serve', ->
    grunt.task.run [
      'connect:server'
      'watch'
    ]
