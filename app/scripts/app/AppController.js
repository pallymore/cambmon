'use strict';

angular.module('cambMonApp')
  .controller('AppCtrl', function ($scope, $http, $routeParams) {
    var appName = $routeParams.name,
    appApiUrl = '/api/apps/' + appName;

    var handleAppLogs = function (ramData) {
      $scope.$emit('$updateRam', JSON.parse(ramData.data));
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

