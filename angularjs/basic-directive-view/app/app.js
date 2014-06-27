;(function(exports){

  var module = angular.module('App', ['ngRoute']);

  module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'app/templates/home.html',
          controller: 'homeCtrl'
        })
        .when('/signin', {
          templateUrl: 'app/templates/signin.html',
          controller: 'authCtrl'
        })
        .otherwise({ redirectTo: '/' })
  }]);

  exports.App = module;
})(window);
