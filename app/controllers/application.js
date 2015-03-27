import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  currentUser: null,

  updateToken: function() {
    ENV.APP.accessToken = this.get('localStorageProxy.accessToken');
  }.observes("localStorageProxy.accessToken").on("init"),

  updateCurrentUser: function() {
    var controller = this;
    return Ember.run(function() {
      controller.set('currentUser', controller.get('localStorageProxy.username'));
    });
  }.observes('localStorageProxy.username').on('init')

});
