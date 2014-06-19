'use strict';

angular.module('cambMonApp')
  .controller('DynosCtrl', function ($scope, $http, $routeParams, $interval, $rootScope) {
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
  });
