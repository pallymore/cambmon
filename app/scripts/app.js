'use strict';

angular.module('cambMonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/apps'
      })
      .when('/apps', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/apps/:name', {
        templateUrl: 'partials/app',
        controller: 'AppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
