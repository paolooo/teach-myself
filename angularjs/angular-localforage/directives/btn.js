;(function(){
  var module = window.App;

  var btn = function() {
    return {
      restrict: "E",
      template: "<button>{{title}}</button>",
      transclude: true,
      scope: true,
      link: function (scope, element, attrs) {
        scope.title = attrs.title;
        element.bind('click', scope[''+attrs.action]);
      }
    };
  };

  module.directive('btn', btn);
})();
