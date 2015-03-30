import Ember from 'ember';

import Login from 'pow-wow-frontend/mixins/login';

export default Ember.Controller.extend(Login, {

  actions: {
    login: function() {
      this.loginUser(this.get('login'), this.get('password'));
    }
  }
});
