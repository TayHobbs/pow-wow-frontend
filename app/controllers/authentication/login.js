import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  attemptedTransition: null,

  preformTransition: function() {
    attemptedTransition = this.get('attemptedTransition')
    if (attemptedTransition) {
      attemptedTransition.retry()
      this.setProperties('attemptedTransition', null)
    } else {
      this.transitionToRoute('index')
    }
  },

  actions: {
    loginUser: function() {
      var controller = this;
      var attemptedTransition = this.get('attemptedTransition');
      var data = this.getProperties('login', 'password')

      Ember.$.post(ENV.apiDomain.concat('session'), data, function(results) {
        var apiKey = results.api_key

        ENV.APP.authToken = apiKey;
        controller.set('localStorageProxy.accessToken', apiKey.access_token);
        controller.set('localStorageProxy.userId', apiKey.user_id);

        if (attemptedTransition) {
          attemptedTransition.retry();
          controller.set('attemptedTransition', null);
        } else {
          this.get('target').transitionTo('index');
        }
      });
    }
  }
});

