/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();


if (app.env === 'test' || app.env === 'development') {
  app.import('bower_components/fauxjax/dist/fauxjax.min.js');
}
app.import('bower_components/lodash/lodash.min.js');

module.exports = app.toTree();
