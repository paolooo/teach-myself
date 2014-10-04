// Generated by CoffeeScript 1.7.1
var BaseClassModel;

BaseClassModel = function() {
  this.$get = [
    "fm.player.model.DbQueryInterface", function(DbQueryInterface) {
      var BCModel, queryInterface;
      queryInterface = null;

      /*
      Base Class Model
      @param {object} db_query_interface Interface to basic query methods like 'save()', 'update()', 'get()', and 'delete()'
       */
      return BCModel = function(queryInterface) {
        if (queryInterface == null) {
          queryInterface = DbQueryInterface;
        }
        BCModel.prototype.$save = queryInterface.$save;
        BCModel.prototype.$get = queryInterface.$get;
        BCModel.prototype.$update = queryInterface.$update;
        return BCModel.prototype.$delete = queryInterface.$delete;
      };
    }
  ];
};

angular.module("fm.player.model").provider("fm.player.model.Base", BaseClassModel);
