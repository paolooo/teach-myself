###
Post Model
###
PostModel = ->

  @$get = [
    "fm.player.model"
    (Model) ->
      class PostModel extends Model
      new PostModel
  ]
  return

angular
  .module 'app'
  .provider "PostModel", PostModel
