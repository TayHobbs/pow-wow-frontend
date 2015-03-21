/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

module.exports = app.toTree();

if (app.env === 'test' || app.env === 'development') {
  app.import('bower_components/fauxjax/dist/fauxjax.min.js');
}
app.import('bower_components/lodash/lodash.min.js');
