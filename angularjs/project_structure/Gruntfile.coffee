'use strict'

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON __dirname + '/package.json'

    connect:
      options:
        port: "<%= pkg.config.connect.port %>"
        middleware: (connect, options)->
          return [lrSnippet, folderMount connect, options.base]
