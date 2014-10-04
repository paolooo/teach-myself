DbQueryInterface = ->
  $find: -> throw Error "Unimplemented method DbQueryInterface.$get()."
  $create: -> throw Error "Unimplemented method DbQueryInterface.$save()."
  $update: -> throw Error "Unimplemented method DbQueryInterface.$update()."
  $delete: -> throw Error "Unimplemented method DbQueryInterface.$delete()."
  $count: -> throw Error "Unimplemented method DbQueryInterface.$count()."

angular
  .module('fm.player.model')
  .factory 'fm.player.model.DbQueryInterface', DbQueryInterface
