'use strict';

var Heroku = require('heroku-client');

exports.init = function () {
  return new Heroku({ token: process.env.HEROKU_API_KEY });
};
