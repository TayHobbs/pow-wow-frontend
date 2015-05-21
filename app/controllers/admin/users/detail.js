import Ember from 'ember';
import ENV from 'pow-wow-frontend/config/environment';

export default Ember.Controller.extend({
  actions: {
    save() {
      this.model.set('password', ''); // Currently necessary so that Rails won't try to set the password to nil
      this.model.save();
      this.transitionToRoute('admin.users');
      Ember.get(this, 'flashMessages').success('User information successfully changed!', { sticky: ENV.stickyFlash });
    }
  }
});
