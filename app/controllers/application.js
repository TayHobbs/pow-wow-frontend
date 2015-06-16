import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  updateToken: function() {
    ENV.APP.accessToken = this.get('localStorageProxy.accessToken');
  }.observes('localStorageProxy.accessToken').on('init'),

  actions: {
    logout() {
      this.set('localStorageProxy.accessToken', null);
      this.set('localStorageProxy.userId', null);
      this.set('localStorageProxy.username', null);
      this.transitionToRoute('index');
    }
  }
});
