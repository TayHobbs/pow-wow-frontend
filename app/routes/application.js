import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    logout() {
      this.set('localStorageProxy.accessToken', null);
      this.set('localStorageProxy.userId', null);
      this.set('localStorageProxy.username', null);
      this.transitionTo('index');
    }
  }
});
