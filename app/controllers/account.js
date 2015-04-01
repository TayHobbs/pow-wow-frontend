import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: null,

  actions: {
    dismissFlashMessage: function() {
      this.set('flashMessage', null);
    }
  }
});
