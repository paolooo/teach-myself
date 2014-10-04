BaseClassModel = ->
  @$get = [
    "fm.player.model.DbQueryInterface"
    (DbQueryInterface) ->
      queryInterface = null

      ###
      Base Class Model
      @param {object} db_query_interface Interface to basic query methods like 'save()', 'update()', 'get()', and 'delete()'
      ###
      BCModel = (queryInterface = DbQueryInterface) ->
        BCModel::$save = queryInterface.$save
        BCModel::$get =  queryInterface.$get
        BCModel::$update = queryInterface.$update
        BCModel::$delete = queryInterface.$delete
  ]
  return

angular
  .module("fm.player.model")
  .provider "fm.player.model.Base", BaseClassModel
