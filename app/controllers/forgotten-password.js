import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  actions: {
    sendForgottenPasswordEmail() {
      let email = this.get('email');
      Ember.$.ajax({
        method: 'GET',
        url: `${ENV.apiDomain}/users/${this.get('email')}/forgot`,
        success: (results) => {
          Ember.run.later(() => { this.set('emailSent', true)} );
        },
        error: (jqXHR, status, error) => {
          Ember.run.later(() => {
            Ember.get(this, 'flashMessages').add({
              message: 'We have no record of that email, please enter another.', sticky: ENV.stickyFlash
            });
          });
          return jqXHR;
        }
      });

    }
  }
});
