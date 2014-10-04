Model = ->
  @$get = [
    "fm.player.model.Base"
    (BaseClassModel) ->
      class Model extends BaseClassModel
        constructor: ->
          super null
  ]
  return

angular
  .module "fm.player.model", []
  .provider "fm.player.model", Model
