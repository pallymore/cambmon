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

      $scope.dynoMessage = function (dyno) {
        switch(dyno.state) {
        case 'up':
          return 'System operational.';
        case 'down':
          return 'System offline.';
        case 'idle':
          return 'No doing anything.';
        case 'crashed':
          return 'Aw, Snap!';
        case 'starting':
          return 'Starting up...';
        }
      };

      $scope.dynoIconClass = function (type) {
        switch(type) {
        case 'web':
          return 'fa-cube';
        case 'log':
          return 'fa-file-text-o';
        case 'worker':
          return 'fa-cogs';
        }
      };
    });
  });
