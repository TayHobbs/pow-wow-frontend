import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    confirmDelete: function() {
      var controller = this;
      this.store.find('user', localStorage.userId).then(function(user){
        user.destroyRecord();
        controller.send('logout');
      });
    },
    cancelDelete: function() {
      this.transitionToRoute('account');
    }
  }
});
