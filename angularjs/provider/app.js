(function(){
  var module = angular.module('app', ['ngRoute']);

  // Step 1 - Factory
  module.factory('gameFactory', function(){
    return {
      name: 'Game Factory'
    }
  });

  // Step 2 - ConfigProvider
  module.config(function($provide) {
    $provide.factory('gameConfigProvideFactory', function(){
      return {name: 'Game Config Provide Factory'};
    });
  });

  // Step 3 - ConfigProvideProvider
  module.config(function($provide) {
    $provide.provider('gameConfigProvideProvider', function(){
      return {
        $get: function() {
          return {name: 'Game Config Provide Provider'}
        }
      }
    })
  });

  // App Controller
  var AppCtrl = function($scope, gameFactory, gameConfigProvideFactory, gameConfigProvideProvider) {
    $scope.title = "Hello World!";
    $scope.gamefactory = gameFactory.name;
    $scope.gameConfigProvideFactory = gameConfigProvideFactory.name;
    $scope.gameConfigProvideProvider = gameConfigProvideProvider.name;
  };
  AppCtrl.$inject = ['$scope', 'gameFactory', 'gameConfigProvideFactory', 'gameConfigProvideProvider'];


  module.controller('AppCtrl', AppCtrl);
})();
