import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  errors: [],

  actions: {
    updateUser: function() {
      var controller = this;
      var email = this.get('email');
      var username = this.get('username');

      this.store.find('user', this.get('localStorageProxy.userId')).then(function(user) {
        user.set('username', username);
        user.set('email', email);
        user.save();
        controller.set('localStorageProxy.username', user.get('username'));
        Ember.get(controller, 'flashMessages').add({
          message: 'Account information successfully changed!', sticky: ENV.stickyFlash
        });
        controller.transitionToRoute('account');
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
    },
    updatePassword: function() {
      var controller = this;
      var password = this.get('password');
      var confirmPassword = this.get('confirmPassword');

      if (password == confirmPassword) {
        this.store.find('user', this.get('localStorageProxy.userId')).then(function(user) {
          user.set('password', password);
          user.save();
          Ember.get(controller, 'flashMessages').add({
            message: 'Password successfully changed!', sticky: ENV.stickyFlash
          });
          controller.transitionToRoute('account');
        });
      } else {
        this.errors.pushObject('Passwords didn\'t match, please try again.');
      }
    }
  }
});
