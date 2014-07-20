'use strict';

angular.module('cambMonApp')
  .controller('AppsCtrl', function ($scope, $http, AppService) {
    $scope.apps = AppService.getApps();
  });

