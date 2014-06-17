'use strict';

var hk = require('../services/heroku');
var heroku = hk.init();

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
  var hkStream = hk.logStream(heroku.apps(req.params.name)),
    logStream= hkStream.stream;

  req.socket.setTimeout(Infinity);
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  res.write('\n');

  req.on('close', function () {
    hkStream.close();
    res.end();
  });

  logStream.on('data', function(data) {
    res.write('data: ' + data + '\n\n');
  });
};
