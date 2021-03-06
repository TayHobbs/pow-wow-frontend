import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index');
  this.route('admin', function() {
    this.route('users', function() {
      this.route('detail', { path: '/:user_id' });
    });
  });
  this.route('authentication', { path: '/' }, function() {
    this.route('login', { path: '/login' });
  });
  this.route('account', function() {
    this.route('delete');
    this.route('edit');
  });
  this.route('project', function() {
    this.route('create');
  });
  this.route('signup');
  this.route('forgotten-password');
});

export default Router;
