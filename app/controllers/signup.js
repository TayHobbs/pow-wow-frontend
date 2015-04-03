import Ember from 'ember';

import Login from 'pow-wow-frontend/mixins/login';

export default Ember.Controller.extend(Login, {
  errors: [],

  actions: {
    signUp: function() {
      var controller = this;
      this.set('errors', []);

      var user = this.store.createRecord( 'user', this.getProperties('username', 'email', 'password'));
      if (user.get('validEmail')) {
        user.save().then(function(user) {
          controller.loginUser(user.get('email'), user.get('password'));
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
      } else {
        this.errors.pushObject('Email is invalid, please enter another.');
      }
    }
  }
});
