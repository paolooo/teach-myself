YdnDbQuery = ->
  @$get = [
    () ->
      Ydn = ->
      Ydn::$find = -> console.log 'ydn $find'
      Ydn::$create = -> console.log 'ydn $create'
      Ydn::$update = -> console.log 'ydn $update'
      Ydn::$delete = -> console.log 'ydn $delete'
      Ydn
  ]
  return

angular
  .module 'fm.player.model'
  .provider 'fm.player.model.YdnDbQuery', YdnDbQuery
