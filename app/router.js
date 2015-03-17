import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("index", {path: "/"});
  this.resource('sessions', function() {
    this.route('new');
  });
  this.resource('users', function() {
    this.route('new');
  })
  this.route('top_secret');
});

export default Router;
