import Ember from 'ember';

import Login from 'pow-wow-frontend/mixins/login';

export default Ember.Controller.extend(Login, {
  errors: [],

  actions: {
    signUp() {
      this.set('errors', []);

      let user = this.store.createRecord( 'user', this.getProperties('username', 'email', 'password'));
      if (!user.get('validEmail')) {
        this.errors.pushObject('Email is invalid, please enter another.');
        return;
      }

      user.save().then((user) => {
        this.loginUser(user.get('email'), user.get('password'));
      }, (error) => {
        if (error && error.errors) {
          for(let key in error.errors){
            // check also if property is not inherited from prototype
            if (error.errors.hasOwnProperty(key)) {
              this.errors.pushObject(key.concat(' ', error.errors[key], '.'));
            }
          }
        }
      });
    }
  }
});
