'use strict';

angular.module('cambMonApp')
  .controller('DynosCtrl', function ($scope, $http, $routeParams, $interval, $rootScope) {
    $rootScope.$on('$updateRam', function (rootScope, data) {
      if ($scope.dynos && data["sample#memory_total"]) {
        angular.forEach($scope.dynos, function (dyno) {
          if (dyno.name === data.source) {
            $scope.$apply(function () {
              dyno.currentRam = parseFloat(data["sample#memory_total"]);
              dyno.maxRAM = dynoMaxRAM(dyno);
            });
          }
        });
      }
    });

    var dynoMaxRAM = function dynoSize (dyno) {
      switch (dyno.size) {
        case "1X":
          return 512;
        case "2X":
          return 1024;
        case "PX":
          return 6144;
      }
    };

    $scope.fetchDynos();
  });
