/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  hinting: false
});


if (app.env === 'test' || app.env === 'development') {
  app.import('bower_components/fauxjax/dist/fauxjax.min.js');
}

app.import('bower_components/lodash/lodash.min.js');
app.import('bower_components/foundation/js/foundation.min.js');
app.import('bower_components/foundation/js/foundation/foundation.topbar.js');

module.exports = app.toTree();
