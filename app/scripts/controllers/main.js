'use strict';

angular.module('cambMonApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/apps').success(function(apps) {
      $scope.apps = apps;
    });
  });

angular.module('cambMonApp')
  .controller('AppCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/apps/' + $routeParams.name).success(function(app) {
      $scope.app = app;
    });
  });

angular.module('cambMonApp')
  .controller('DynoCtrl', function ($scope, $http, $routeParams) {
    $http.get('/api/apps/' + $routeParams.name + '/dynos').success(function(dynos) {
      $scope.dynos = dynos;
    });
  });
