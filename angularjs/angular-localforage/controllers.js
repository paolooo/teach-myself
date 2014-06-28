;(function(){
  var module = window.App;

  var homeCtrl =  ['$scope', '$localForage', function($scope, $localForage){
    var save = function(tasks) {
      var tasks = JSON.stringify(tasks);
      $localForage.setItem('tasks', tasks).then(function(data){
        // done adding
      });
    };

    $scope.add = function() {
      $scope.tasks.push($scope.task);
      $scope.task = '';
      save($scope.tasks);
    };

    $scope.delete = function(e) {
      index = angular.element(e.target).parent().parent().scope().$index;
      $scope.tasks.splice(index, 1);
      save($scope.tasks);
    };

    $localForage.getItem('tasks').then(function(data){
      $scope.tasks = JSON.parse(data) || [];
    });

  }];

  module
    .controller('homeCtrl', homeCtrl);
})();
