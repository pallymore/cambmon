'use strict';

angular.module('cambMonApp')
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
