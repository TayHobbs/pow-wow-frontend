import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    logout: function() {
      this.set('localStorageProxy.accessToken', null);
      this.set('localStorageProxy.userId', null);
      this.transitionTo('index');
    }
  }
});
