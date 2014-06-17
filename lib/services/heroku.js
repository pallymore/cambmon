'use strict';

var Heroku = require('heroku-client');
var token = process.env.HEROKU_API_KEY;

exports.init = function () {
  return new Heroku({ token: token  });
};

exports.token = function () {
  return token;
};
