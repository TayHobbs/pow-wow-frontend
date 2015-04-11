import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Mixin.create({
  attemptedTransition: null,

  preformTransition: function() {
    let attemptedTransition = this.get('attemptedTransition');
    if (attemptedTransition) {
      attemptedTransition.retry();
      this.setProperties('attemptedTransition', null);
    } else {
      this.transitionToRoute('index');
    }
  },

  loginUser: function(login, password) {
    let attemptedTransition = this.get('attemptedTransition');
    let router = this.get('target');
    Ember.$.ajax({
      method: 'POST',
      url: ENV.apiDomain.concat('/session'),
      data: {login: login, password: password},
      success: (results) => {
        let apiKey = results.api_key;
        ENV.APP.authToken = apiKey;
        this.set('localStorageProxy.accessToken', apiKey.access_token);
        this.set('localStorageProxy.userId', apiKey.user_id);
        this.set('localStorageProxy.username', results.username);

        if (attemptedTransition) {
          attemptedTransition.retry();
          this.set('attemptedTransition', null);
        } else {
          router.transitionTo('index');
        }
      },
      error: (jqXHR, status, error) => {
        Ember.run.later(() => {
          Ember.get(this, 'flashMessages').add({
            message: 'Incorrect username or password, please try again', sticky: ENV.stickyFlash
          });
        });
        return jqXHR;
      }
    });
  }
});
