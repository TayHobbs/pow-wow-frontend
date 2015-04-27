import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  errors: [],

  actions: {
    updateUser() {
      this.model.set('password', ''); // Currently necessary so that Rails won't try to set the password to nil
      this.model.save().then((user) => {
        this.set('localStorageProxy.username', user.get('username'));
        Ember.get(this, 'flashMessages').add({
          message: 'Account information successfully changed!', sticky: ENV.stickyFlash
        });
        this.transitionToRoute('account');
      }, (error) => {
        if (error && error.errors) {
          for(const key in error.errors){
            // check also if property is not inherited from prototype
            if (error.errors.hasOwnProperty(key)) {
              this.errors.pushObject(key.concat(' ', error.errors[key], '.'));
            }
          }
        }
      });
    },

    updatePassword() {
      let password = this.get('password');

      if (password !== this.get('confirmPassword')) {
        this.errors.pushObject('Passwords didn\'t match, please try again.');
        return;
      }

      this.model.set('password', password);
      this.model.save().then(() => {
        Ember.get(this, 'flashMessages').add({
          message: 'Password successfully changed!', sticky: ENV.stickyFlash
        });
        this.transitionToRoute('account');
      });
    }
  }
});
