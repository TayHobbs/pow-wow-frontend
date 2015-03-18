import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.Object.create();
  },

  actions: {
    x: function() {
      console.log(this.store.find('user'));
    }
  }
});
