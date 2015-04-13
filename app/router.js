import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index');
  this.route('admin', function() {
    this.route('user', function() {
      this.route('detail', { path: '/:user_id' })
    });
  });
  this.route('authentication', {path: '/'}, function() {
    this.route('login', {path: '/login'});
  });
  this.route('account', function() {
    this.route('delete');
    this.route('edit');
  });
  this.route('signup');
});

export default Router;
