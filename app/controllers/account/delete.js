import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    confirmDelete: function() {
      this.store.find('user', localStorage.userId).then((user) => {
        user.destroyRecord();
        this.send('logout');
      });
    },

    cancelDelete: function() {
      this.transitionToRoute('account');
    }
  }
});
