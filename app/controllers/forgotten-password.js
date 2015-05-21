import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  actions: {
    sendForgottenPasswordEmail() {
      Ember.$.ajax({
        method: 'GET',
        url: `${ENV.apiDomain}/users/${this.get('email')}/forgot`,
        success: () => {
          Ember.run.later(() => { this.set('emailSent', true); });
        },
        error: (jqXHR) => {
          Ember.run.later(() => {
            Ember.get(this, 'flashMessages').alert('We have no record of that email, please enter another.', { sticky: ENV.stickyFlash });
          });
          return jqXHR;
        }
      });

    }
  }
});
