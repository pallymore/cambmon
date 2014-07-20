'use strict';

angular.module('cambMonApp')
  .service('AppService', function ($resource) {
    var App = $resource('/api/apps/:appName', {appName:'@name'});
    var services = {};

    services.getApps = function GetApps () {
      return App.query();
    };

    services.getApp = function GetApp (appName) {
      return App.get(appName);
    };

    return services;
  });

