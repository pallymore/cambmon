'use strict';

angular.module('cambMonApp')
  .controller('AppsCtrl', function ($scope, $http) {
    $http.get('/api/apps').success(function(apps) {
      $scope.apps = apps;
    });
  });

