Database = ->
  name = 'FmPlayerDbTemp'
  version = '1.0'

  @setName = (db_name) -> name = db_name if db_name
  @setVersion = (db_version) -> version = db_version if db_version
  @$get = [
    () ->
      name: name
      version: version
  ]
  return

angular
  .module('fm.player.model')
  .provider 'fm.player.model.Database', Database
