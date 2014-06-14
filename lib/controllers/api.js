'use strict';

var heroku = require('../services/heroku').init();

/**
 * Get awesome things
 */
exports.apps = function(req, res) {
  heroku.apps().list(function (err, apps) {
    res.json(apps);
  });
};
