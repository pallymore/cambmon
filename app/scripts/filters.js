'use strict';

angular.module('cambMonApp')
  .filter('to_i', function() {
    return function(input) {
      return parseInt(input, 10);
    };
  });
