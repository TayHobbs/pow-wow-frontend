import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Mixin.create({
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

  loginUser: function(login, password) {
    var mixin = this;
    var attemptedTransition = this.get('attemptedTransition');
    var router = this.get('target');
    Ember.$.ajax({
      method: 'POST',
      url: ENV.apiDomain.concat('/session'),
      data: {login: login, password: password},
      success: function(results) {
        var apiKey;
        apiKey = results.api_key;
        ENV.APP.authToken = apiKey;
        mixin.set('localStorageProxy.accessToken', apiKey.access_token);
        mixin.set('localStorageProxy.userId', apiKey.user_id);
        mixin.set('localStorageProxy.username', results.username);

        if (attemptedTransition) {
          attemptedTransition.retry();
          mixin.set('attemptedTransition', null);
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
});
