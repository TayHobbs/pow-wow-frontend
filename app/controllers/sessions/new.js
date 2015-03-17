import Ember from 'ember';
import App from '../../app';
import ENV from 'pow-wow-frontend/config/environment'

export default Ember.ObjectController.extend({
  attemptedTransition: null,

  actions: {
    loginUser: function() {
      var controller = this;
      var router = this.get('target');
      var data = this.getProperties('login', 'password');
      var rememberMe = this.get('remember_me');
      var attemptedTrans = this.get('attemptedTransition');

      Ember.$.post('http://localhost:3000/api/v1/auth/login', data, function(results) {

        ENV.APP.authToken = results
        console.log("ENV~");
        console.log(ENV.APP.authToken);
        App.AuthManager.authenticate(results.token, results.user_id, rememberMe);

        if (attemptedTrans) {
          attemptedTrans.retry();
          controller.set('attemptedTransition', null);
        } else {
          router.transitionTo('index');
        }
      });
    }
  }
});
