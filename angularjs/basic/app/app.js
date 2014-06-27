;(function(){

  var module = angular.module('App', ['ui.router']);

  module.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
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
      })
  }]);

})();
