/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});

  if (app.env === 'test' || app.env === 'development') {
    app.import('bower_components/fauxjax/dist/fauxjax.min.js');
  }

  app.import('bower_components/lodash/lodash.min.js');
  app.import('bower_components/foundation/css/foundation.css');
  app.import('bower_components/foundation/css/normalize.css');
  app.import('bower_components/foundation/js/foundation.min.js');
  app.import('bower_components/foundation/js/foundation/foundation.topbar.js');

  return app.toTree();
};
