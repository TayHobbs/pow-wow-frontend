import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      this.model.password = ''; // Currently necessary so that Rails won't try to set the password to nil
      this.model.save();
      this.transitionToRoute('admin.user');
      Ember.get(this, 'flashMessages').add({
        message: 'User information successfully changed!', sticky: ENV.stickyFlash
      });
    }
  }
});
