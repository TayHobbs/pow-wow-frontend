import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateUser: function() {
      var controller = this;
      var username =   this.get('username');
      var email =   this.get('email');
      this.store.find('user', this.get('localStorageProxy.userId')).then(function(user) {
        user.set('username', username);
        user.set('email', email);
        user.save();
        controller.set('localStorageProxy.username', user.get('username'));
        controller.transitionToRoute('account');
      });
    }
  }
});
