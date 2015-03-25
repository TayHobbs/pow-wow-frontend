import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  attemptedTransition: null,

  preformTransition: function() {
    var attemptedTransition = this.get('attemptedTransition');
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.setProperties('attemptedTransition', null);
    } else {
      this.transitionToRoute('index');
    }
  },

  actions: {
    loginUser: function() {
      var controller = this;
      var attemptedTransition = this.get('attemptedTransition');
      var router = this.get('target');

      Ember.$.ajax({
        method: "POST",
        url: ENV.apiDomain.concat('/session'),
        data: {login: this.get('login'), password: this.get('password')},
        success: function(results) {
          var apiKey;
          apiKey = results.api_key;
          ENV.APP.authToken = apiKey;
          controller.set('localStorageProxy.accessToken', apiKey.access_token);
          controller.set('localStorageProxy.userId', apiKey.user_id);

          if (attemptedTransition) {
            attemptedTransition.retry();
            controller.set('attemptedTransition', null);
          } else {
            router.transitionTo('index');
          }
        },
        fail: function(jqXHR, status, error) {
          console.log(error);
          console.log(status);
          return jqXHR;
        }
      });
    }
  }
});
