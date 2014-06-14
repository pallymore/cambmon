'use strict';

var heroku = require('../services/heroku').init();

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
