'use strict';

var hk = require('../services/heroku');
var heroku = hk.init();
var logSession = require('heroku-log-session');

/**
 * Get awesome things
 */
exports.listApps = function(req, res) {
  heroku.apps().list(function (err, apps) {
    res.json(apps);
  });
};

exports.showApp = function (req, res) {
  heroku.apps(req.params.name).info(function (err, info) {
    res.json(info);
  });
};

exports.listDynos = function (req, res) {
  heroku.apps(req.params.name).dynos().list(function (err, dynos) {
    res.json(dynos);
  });
};

exports.logs = function (req, res) {
  var session = logSession(hk.token());
  session.sse(req.params.name, req, res);
};
