'use strict';

angular.module('cambMonApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Apps',
      'link': '/apps'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
