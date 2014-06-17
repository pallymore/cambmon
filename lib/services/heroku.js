'use strict';

var Heroku = require('heroku-client');
var token = process.env.HEROKU_API_KEY;
var split = require('split');
var https = require('https');

exports.init = function () {
  return new Heroku({ token: token  });
};

exports.token = function () {
  return token;
};

exports.logStream = function (app) {
  var splitStream = split();
  var logRequest;

  function closeStream () {
    logRequest.abort();
  }

  app.logSessions().create({tail: true}, function (err, logSession) {
    if (err) {
      splitStream.emit('error', err);
    }

    logRequest = https.get(logSession.logplex_url);

    logRequest.on('response', function(logResponse) {
      logResponse.pipe(splitStream);
    });

    logRequest.on('error', function(err) {
      splitStream.emit('error', err);
    });
  });

  splitStream.on('error', function () {
    closeStream();
  });

  return {
    stream: splitStream,
    close: closeStream
  };
};

