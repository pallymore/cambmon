'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/apps')
    .get(api.listApps);

  app.route('/api/apps/:name')
    .get(api.showApp);

  app.route('/api/apps/:name/dynos')
    .get(api.listDynos);

  app.route('/api/apps/:name/logs')
    .get(api.logs);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get(index.index);
};
