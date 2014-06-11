'use strict'

module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.initConfig
    connect:
      server:
        options:
          hostname: 'localhost'
          port: 9003,
          base: '.',
          keepalive: true

  grunt.registerTask 'serve', ['connect']
