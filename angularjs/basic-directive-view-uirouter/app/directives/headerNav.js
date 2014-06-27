;(function(exports){
  var module = exports.App;

  module.directive('headerNav', ['$location', function($location){
    return {
      restrict: 'A',
      scope: false,
      templateUrl: 'app/templates/header.html',

      controller: function($scope) {
        $scope.title = "Home";
        $scope.location = $location.url() || "home";

        $scope.$on('$locationChangeSuccess', function(e) {
          $scope.location = $location.url();
        });
      },

      link: function(scope, element, attrs) {
        element.bind('click', function(e){
          if (e.target.tagName === "A") {
            scope.title = e.target.innerText
          }
        });
      }
    };
  }]);
})(window);
