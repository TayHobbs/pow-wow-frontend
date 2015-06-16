import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: null,

  updateCurrentUser: function() {
    return Ember.run(() => {
      this.set('currentUser', this.get('localStorageProxy.username'));
    });
  }.observes('localStorageProxy.username').on('init'),

  didInsertElement: function() {
    this.$().foundation('topbar');
  },

  willDestroyElement: function() {
    this.$().foundation('topbar', 'off');
  },
  actions: {
    logout() {
      this.attrs.logout();
    }
  }

});
