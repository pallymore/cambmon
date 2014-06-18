'use strict';

angular.module('cambMonApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/apps').success(function(apps) {
      $scope.apps = apps;
    });
  });

angular.module('cambMonApp')
  .controller('AppCtrl', function ($scope, $http, $routeParams) {
    var appName = $routeParams.name,
      appApiUrl = '/api/apps/' + appName;

    var handleAppLogs = function (logs) {
      console.log(JSON.parse(logs.data));
    };

    $http.get(appApiUrl).success(function(app) {
      var logStream = new EventSource(appApiUrl + '/logs');

      $scope.app = app;
      $scope.updating = false;

      logStream.addEventListener('message', handleAppLogs, false);
      logStream.addEventListener('error', handleAppLogs, false);

      $scope.$on('$destroy', function() {
        logStream.close();
      });
    });

    $scope.fetchDynos = function () {
      $scope.updating = true;
      $http.get('/api/apps/' + $routeParams.name + '/dynos').success(function(dynos) {
        $scope.updating = false;
        $scope.dynos = dynos;
      });
    };
  });

angular.module('cambMonApp')
  .controller('DynoCtrl', function ($scope, $http, $routeParams, $interval) {
    var autoRefesh = $interval(function () {
      if (!$scope.updating) {
        $scope.fetchDynos();
      }
    }, 30000);

    $scope.$on('$destroy', function() {
      $interval.cancel(autoRefesh);
    });

    $scope.fetchDynos();
  })
  .directive('dynoStatusMessage', function () {
    var messages = {
      up: 'System operational.',
      down: 'System offline.',
      idle: 'No doing anything.',
      crashed: 'Aw, Snap!',
      starting: 'Starting up...',
      restarting: 'System restarting.'
    };

    return {
      template: "{{dynoMessage}}",
      link: function (scope) {
        scope.dynoMessage = messages[scope.dyno.state];
      }
    };
  });
