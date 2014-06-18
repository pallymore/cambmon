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

angular.module('cambMonApp')
  .controller('DynosCtrl', function ($scope, $http, $routeParams, $interval, $rootScope) {
    // var autoRefesh = $interval(function () {
    //   if (!$scope.updating) {
    //     $scope.fetchDynos();
    //   }
    // }, 30000);

    // $scope.$on('$destroy', function() {
    //   $interval.cancel(autoRefesh);
    // });

    $rootScope.$on('$updateRam', function (rootScope, data) {
      if ($scope.dynos && data["sample#memory_total"]) {
        angular.forEach($scope.dynos, function (dyno) {
          if (dyno.name === data.source) {
            $scope.$apply(function () {
              dyno.currentRam = parseFloat(data["sample#memory_total"]);
            });
          }
        });
      }
    });

    $scope.fetchDynos();
  })
  .directive('dynoStatusMessage', function () {
    var messages = {
      up: 'System operational.',
      down: 'System is offline.',
      idle: 'Not doing anything. :/',
      crashed: 'CRASHED!',
      starting: 'Starting up...',
      restarting: 'Restarting...'
    };

    return {
      template: "{{dynoMessage}}",
      link: function (scope) {
        scope.dynoMessage = messages[scope.dyno.state];
      }
    };
  });


angular.module('cambMonApp')
  .filter('to_i', function() {
    return function(input) {
      return parseInt(input, 10);
    };
  });
