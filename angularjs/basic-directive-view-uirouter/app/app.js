;(function(exports){

  var module = angular.module('App', ['ui.router']);

  module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/templates/home.html',
        controller: 'homeCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/templates/signin.html',
        controller: 'authCtrl'
      });

  }]);

  exports.App = module;
})(window);
