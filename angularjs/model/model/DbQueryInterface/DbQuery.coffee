DbQuery = ->
  queryInterface = null
  @setDbQueryInterface = (queryInterface=queryInterface) ->
  @$get = [
    'fm.player.model.DbQueryInterface'
    (DbQueryInterface) ->
      queryInterface: queryInterface || DbQueryInterface
  ]
  return

angular
  .module 'fm.player.model'
  .provider 'fm.player.model.DbQuery', DbQuery
