'use strict'

module.exports = (grunt) ->
  pkg = grunt.file.readJSON __dirname + '/package.json'

  grunt.initConfig
    pkg: pkg

  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'serve', ->
    grunt.util.spawn
      cmd: 'coffee'
      args: ['./server.coffee']
      opts:
        stdio: 'inherit'
    grunt.log.writeln "Started web server on port #{pkg.config.server.port}."
