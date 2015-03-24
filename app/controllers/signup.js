import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signUp: function() {
      this.store.createRecord('user', this.getProperties('username', 'email', 'password')).save();
      this.transitionToRoute('index');
    }
  }
});
