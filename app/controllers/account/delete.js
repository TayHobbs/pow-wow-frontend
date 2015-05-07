import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    confirmDelete() {
      this.store.getById('user', this.get('localStorageProxy.userId'));
      this.send('logout');
    },

    cancelDelete() {
      this.transitionToRoute('account');
    }
  }
});
