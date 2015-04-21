import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.get('localStorageProxy.accessToken')) { this.redirectToLogin(transition); }
  },

  redirectToLogin: function(transition) {
    // Capture where the user was trying to go before they were redirected to the login
    // So we can send them there after they successfully sign in
    this.controllerFor('authentication.login').set('attemptedTransition', transition);
    this.transitionTo('authentication.login');
  },

  actions: {
    error: function (error, transition) {
      console.log('Error status: '.concat(error.status));
      this.redirectToLogin(transition);
    }
  }
});
