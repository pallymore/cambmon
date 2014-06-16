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
      $scope.updating = false;
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
    }, 5000);

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
  })
  .directive('dynoTypeIcon', function () {
    var icons = {
      web: 'fa-cube',
      log: 'fa-file-text-o',
      worker: 'fa-cogs'
    };

    return {
      template: "<i class='fa {{dynoIcon}}'></i>",
      link: function (scope) {
        scope.dynoIcon = icons[scope.dyno.type];
      }
    };
  });
