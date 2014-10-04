###
App Controller
###
AppCtrl = ($scope, Post) ->
  console.log "AppCtrl Post: ", Post

AppCtrl.$inject = [
  '$scope'
  'PostModel'
]

###
Module Config
###
Config = (DatabaseProvider, DbQueryProvider, YdnDbQueryProvider) ->
  console.log 'DatabaseProvider: ', DatabaseProvider

  DatabaseProvider.setName 'FmPlayerChrome'
  DatabaseProvider.setVersion '1.0'

  # DbQueryProvider.setDbQueryInterface()

Config.$inject = [
  'fm.player.model.DatabaseProvider'
  'fm.player.model.DbQueryProvider'
  'fm.player.model.YdnDbQueryProvider'
]

###
Module Run
###
Run = (db, dbquery) ->
  console.log 'db: ', db, dbquery.name

Run.$inject = [
  'fm.player.model.Database'
  'fm.player.model.DbQuery'
]

###
App
###
angular.module "app", [
    "ngRoute"
    "fm.player.model"
  ]
  .config Config
  .run Run
  .controller "AppCtrl", AppCtrl
