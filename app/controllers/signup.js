import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  errors: [],

  actions: {
    signUp: function() {
      var controller = this;
      this.set('errors', []);

      this.store.createRecord(
        'user', this.getProperties('username', 'email', 'password')
        ).save().then(function(user){

        Ember.$.ajax({
          method: "POST",
          url: ENV.apiDomain.concat('/session'),
          data: {login: user.get('email'), password: user.get('password')},
          success: function(results) {
            var apiKey = results.api_key;
            ENV.APP.authToken = apiKey;
            controller.set('localStorageProxy.accessToken', apiKey.access_token);
            controller.set('localStorageProxy.userId', apiKey.user_id);
            controller.set('localStorageProxy.username', results.username);
            controller.transitionToRoute('index');
          },
          failure: function(jqXHR, status, error) {
            console.log(error);
            console.log(status);
            return jqXHR;
          }
        });
      }, function(error) {
        if (error && error.errors) {
          for(var key in error.errors){
            // check also if property is not inherited from prototype
            if (error.errors.hasOwnProperty(key)) {
              controller.errors.pushObject(key.concat(' ', error.errors[key], '.'));
            }
          }
        }
      });
    }
  }
});
