;(function(exports){

  var module = exports.App;

  var homeCtrl = ['$scope', function($scope) {
    console.log('homeCtrl');
  }];

  var authCtrl = ['$scope', function($scope) {
    console.log('authCtrl')
  }];

  module
    .controller('homeCtrl', homeCtrl)
    .controller('authCtrl', authCtrl)
})(window);
