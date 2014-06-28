;(function(){
  var module = angular.module('App', ['ngRoute', 'LocalForageModule']);

  module.config(['$localForageProvider', '$routeProvider', function($localForageProvider, $routeProvider){
    $localForageProvider.config({
      driver: 'asyncStorage', // indexeddb: asyncStorage
                              // localstorage: localStorageWrapper
                              // websql: webSQLStorage
      version: 1.0,
      name: 'sampleTodo',
      storeName: 'todotable',
      description: 'sample localforage.'
    });

    // router
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .otherwise({ redirectTo: '/' });
  }]);

  window.App = module;
})();
