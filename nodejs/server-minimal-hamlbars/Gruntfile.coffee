module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    config: grunt.file.readJSON(__dirname + '/package.json').config

    watch:
      haml:
        files: '<%= config.app %>/**/*.haml'
        tasks: ['haml:server']
      hamlbars:
        files: '<%= config.app %>/**/*.hamlbars'
        tasks: ['hamlbars:default']

    connect:
      server:
        options:
          hostname: 'localhost'
          port: '<%= config.server.port %>'
          base: '<%= config.server.base %>'

    haml:
      server:
        files: [
          expand: true
          cwd: '<%= config.app %>'
          src: ['**/*.haml']
          dest: '<%= config.server.base %>'
          ext: '.html'
        ]

    hamlbars:
      default:
        files: [
          expand: true
          cwd: '<%= config.app %>'
          src: ['**/*.hamlbars']
          dest: '<%= config.server.base %>'
          ext: '.handlebars'
        ]

  grunt.registerTask 'serve', ->
    grunt.task.run [
      'connect:server'
      'watch'
    ]
